import React from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Step2(props) {
  // Validation schema for artist
  const artistSchema = yup.object().shape({
    artistname: yup.string().required("Artist name is required"),
    members: yup
      .number()
      .required("Members is required")
      .min(1, "Must be at least 1 member"),
    genres: yup.string().required("Genre is required"),
    placeOrigin: yup.string().required("Place of origin is required"),
  });

  // Validation schema for host
  const hostSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
    favoritesGenres: yup.string().required("Favorite genre is required"),
  });

  const initialValues = props.user.isArtist
    ? { artistname: "", members: "", genres: "", placeOrigin: "" }
    : { description: "", favoritesGenres: "" };

  const validationSchema = props.user.isArtist ? artistSchema : hostSchema;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (props.user.isArtist) {
        props.updateUser({
          artist: {
            artistname: values.artistname,
            members: parseInt(values.members, 10),
            placeOrigin: values.placeOrigin,
            genres: values.genres.split(","),
          },
        });
      } else if (props.user.isHost) {
        props.updateUser({
          host: {
            description: values.description,
            favoritesGenres: values.favoritesGenres.split(","),
          },
        });
      }
      props.getNextPage(5);
    },
  });

  const previousPage = () => {
    props.getNextPage(3);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View>
        <Text>Mon Profil</Text>
        <View style={styles.stepContent}>
          {props.user.isArtist ? (
            <>
              <Text style={styles.label}>Artist name</Text>
              <TextInput
                style={styles.input}
                placeholder="name"
                onChangeText={formik.handleChange("artistname")}
                onBlur={formik.handleBlur("artistname")}
                value={formik.values.artistname}
              />
              {formik.touched.artistname && formik.errors.artistname ? (
                <Text style={styles.error}>{formik.errors.artistname}</Text>
              ) : null}

              <Text style={styles.label}>Members</Text>
              <TextInput
                style={styles.input}
                placeholder="Number"
                keyboardType="numeric"
                onChangeText={formik.handleChange("members")}
                onBlur={formik.handleBlur("members")}
                value={formik.values.members}
              />
              {formik.touched.members && formik.errors.members ? (
                <Text style={styles.error}>{formik.errors.members}</Text>
              ) : null}

              <Text style={styles.label}>Genre</Text>
              <TextInput
                style={styles.input}
                placeholder="Genre"
                onChangeText={formik.handleChange("genres")}
                onBlur={formik.handleBlur("genres")}
                value={formik.values.genres}
              />
              {formik.touched.genres && formik.errors.genres ? (
                <Text style={styles.error}>{formik.errors.genres}</Text>
              ) : null}

              <Text style={styles.label}>Place of origin</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={formik.handleChange("placeOrigin")}
                onBlur={formik.handleBlur("placeOrigin")}
                value={formik.values.placeOrigin}
              />
              {formik.touched.placeOrigin && formik.errors.placeOrigin ? (
                <Text style={styles.error}>{formik.errors.placeOrigin}</Text>
              ) : null}
            </>
          ) : (
            <>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <Text style={styles.error}>{formik.errors.description}</Text>
              ) : null}

              <Text style={styles.label}>Favorite genre(s)</Text>
              <TextInput
                style={styles.input}
                placeholder="Favorite genre"
                onChangeText={formik.handleChange("favoriteGenre")}
                onBlur={formik.handleBlur("favoriteGenre")}
                value={formik.values.favoriteGenre}
              />
              {formik.touched.favoriteGenre && formik.errors.favoriteGenre ? (
                <Text style={styles.error}>{formik.errors.favoriteGenre}</Text>
              ) : null}
            </>
          )}
        </View>

        <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
          <Text style={styles.textBtn}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={previousPage}>
          <Text style={styles.textBtn}>Previous</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainSelect: {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#5100FF",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    marginTop: 10,
  },
  stepContent: {
    marginVertical: 20,
  },
  textBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginHorizontal: 5,
    marginTop: 5,
  },
});

/*import { useState } from "react";
import {
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text
} from "react-native";



export default function Step2(props) {

    // Variable d'états pour artiste
    const [step2Data, setStep2Data] = useState({
        artistname: '',
        members: 0,
        genres: [],
        placeOrigin: ''
    });

    // Variable d'états pour host
    const [hostStep2Data, setHostStep2Data] = useState({
        description: '',
        favoriteGenre: []
    });


    function submitInfos() {
        if (props.user.isArtist) {
            // Check artist fields
            if (!step2Data.artistname || !step2Data.members || !step2Data.genres || !step2Data.placeOrigin) {
                Alert.alert('Validation Error', 'Please fill out all fields');
                return false;
            }



            //remonte les infos au parent via le props
            props.updateUser({
                artist: {
                    artistname: step2Data.artistname,
                    members: parseInt(step2Data.members, 10),
                    placeOrigin: step2Data.placeOrigin,
                    genres: step2Data.genres,
                }
            })
            props.sendData();


        } else if (props.user.isHost) {
            // Check host fields
            if (!hostStep2Data.description || !hostStep2Data.favoriteGenre) {
                Alert.alert('Validation Error', 'Please fill out all fields');
                return false;
            }

            //remonte les infos au parent via le props
            props.updateUser({
                host: {
                    description: hostStep2Data.description,
                    favoriteGenre: hostStep2Data.favoriteGenre,
                }
            })

            props.sendData();
        }
    };


  

    const previousPage = () => {
        props.getNextPage(2);
    };
    return (
        <View>
            <Text>Mon Profil</Text>
            {!props.user.isHost ? (
                <View style={styles.stepContent}>
                    <Text style={styles.label}>Artist name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="name"
                        value={step2Data.artistname}
                        onChangeText={text => setStep2Data({ ...step2Data, artistname: text })}
                    />
                    <Text style={styles.label}>Member</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Number"
                        value={step2Data.members}
                        keyboardType="numeric"
                        onChangeText={text => setStep2Data({ ...step2Data, members: text })}
                    />
                    <Text style={styles.label}>Genre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Genre"
                        value={step2Data.genres}
                        onChangeText={text => setStep2Data({ ...step2Data, genres: text })}
                    />
                    <Text style={styles.label}>Place of origin</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={step2Data.placeOrigin}
                        onChangeText={text => setStep2Data({ ...step2Data, placeOrigin: text })}
                    />
                </View>
            ) : (
                <View style={styles.stepContent}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={hostStep2Data.description}
                        onChangeText={text => setHostStep2Data({ ...hostStep2Data, description: text })}
                    />
                    <Text style={styles.label}>Favorite genre(s)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Favorite genre"
                        value={hostStep2Data.favoriteGenre}
                        onChangeText={text => setHostStep2Data({ ...hostStep2Data, favoriteGenre: text })}
                    />
                </View>
            )}

            <TouchableOpacity style={styles.btn} onPress={submitInfos}>
                <Text style={styles.textBtn}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={previousPage}>
                <Text style={styles.textBtn}>Previous</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainSelect: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 10
    },
    input: {
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5
    },
    btn: {
        backgroundColor: '#5100FF',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 10
    },
    stepContent: {
        marginVertical: 20,
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
}); 
*/
