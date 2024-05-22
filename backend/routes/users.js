// Importation de tous les modules nécessaires
var express = require("express");
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const { User } = require('../models/users');

// Route POST pour l'inscription avec une vérification des champs requis
router.post("/signup", (req, res) => {
    // Vérifie si les champs 'username', 'password' et 'email' ne sont pas vides
    if (!checkBody(req.body, ['username', 'password', 'email'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    // Cherche dans la base de données si le nom d'utilisateur existe déjà
    User.findOne({ username: req.body.username, email: req.body.email }).then(data => {
        // Si le nom d'utilisateur n'existe pas en base de données
        if (data === null) {
            // Crée une charge utile (payload) pour le token JWT avec le nom d'utilisateur
            const payload = {
                username: req.body.username
            };
            // Options pour le token JWT, incluant l'expiration et l'algorithme utilisé
            const options = {
                expiresIn: '30m',
                algorithm: 'HS256'
            };
            // Hash le mot de passe avec bcrypt en utilisant 10 itérations
            const hash = bcrypt.hashSync(req.body.password, 10);
            // Génère un token JWT avec le payload et les options
            const token = jwt.sign(payload, secretKey, options);
            // Crée un nouvel utilisateur avec les informations fournies et le token généré
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                token
            });

            // Sauvegarde le nouvel utilisateur dans la base de données et renvoie le token dans la réponse
            newUser.save().then(newDoc => {
                res.json({ result: true, token: newDoc.token });
            });
        } else {
            // Si l'utilisateur existe déjà, renvoie une erreur
            res.json({ result: false, error: 'User already exists' });
        }
    });
});

// Route POST pour la connexion (sign in)
router.post("/signin", (req, res) => {
    // Vérifie si les champs 'email' et 'password' ne sont pas vides
    if (!checkBody(req.body, ["email", "password"])) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }

    // Cherche dans la base de données un utilisateur avec l'email fourni
    User.findOne({ email: req.body.email }).then((data) => {
        // Si l'utilisateur est trouvé et que le mot de passe correspond
        if (data && bcrypt.compareSync(req.body.password, data.password)) {
            // Crée une nouvelle charge utile (payload) pour le token JWT
            const payload = {
                username: data.username
            };
            // Options pour le token JWT, incluant l'expiration et l'algorithme utilisé
            const options = {
                expiresIn: '30m',
                algorithm: 'HS256'
            };
            // Génère un nouveau token JWT avec le payload et les options
            const newToken = jwt.sign(payload, secretKey, options);

            // Met à jour le token de l'utilisateur dans la base de données
            data.token = newToken;
            data.save().then(() => {
                // Renvoie le nouveau token dans la réponse
                res.json({ result: true, token: newToken });
            });
        } else {
            // Si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect, renvoie une erreur
            res.json({ result: false, error: "User not found or wrong password" });
        }
    });
});

/*Route POST pour rafraîchir le token afin d'éviter de demander à l'utilisateur de se reconnecter toutes les 30 minutes.
À chaque refresh, un nouveau token est généré (si le token précédent existe déjà en base de données).*/
router.post("/refresh", (req, res) => {
    const token = req.body.token;
    if (!token) {
        res.json({ result: false, error: "Token is required" });
        return;
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.json({ result: false, error: "Invalid token" });
            return;
        }

        const payload = { username: decoded.username };
        const options = { expiresIn: '30m', algorithm: 'HS256' };
        const newToken = jwt.sign(payload, secretKey, options);

        User.findOne({ username: decoded.username }).then((user) => {
            if (user) {
                user.token = newToken;
                user.save().then(() => {
                    res.json({ result: true, token: newToken });
                });
            } else {
                res.json({ result: false, error: "User not found" });
            }
        });
    });
});

module.exports = router;
