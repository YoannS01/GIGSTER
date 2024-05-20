var express = require("express");
var router = express.Router();
import { checkBody } from "../modules/checkBody";

// Route SignIn (connexion)
router.post("/signin", (req, res) => {
  //Vérification des champs
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  //Cherche dans la DB en filtrant sur le username
  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;
