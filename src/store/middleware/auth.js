import * as firebase from 'firebase'
import storeAction from '../actions/action';
import ActionType from '../actions/ActionType';



export default class Auth {
    static Login(state) {

        return (dispatch) => {
                firebase.auth().signInWithEmailAndPassword(state.email, state.password)
                    .then(async (user) => {
                        dispatch(storeAction.login(user))
                        await AsyncStorage.setItem('user', JSON.stringify(user))
                    })
                    .catch((ev) => {
                        dispatch(ActionType.LOGIN_FAIL);
                        alert('An Error Occured');
                    })
        }
    }
    static Signup(state) {
        return (dispatch) => {
            console.log("success")
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then(async (user) => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: state.name,
                        // photoURL: url
                    })
                    firebase.database().ref(`Users/${user.uid}`).set({
                        email: state.email,
                        name: state.name,
                        password: state.password,
                        key: user.uid,
                    })
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                    dispatch(storeAction.signup(user))
                })
                .catch(ev => {
                    console.log(ev)

                    dispatch(ActionType.SIGNUP_FAIL)
                })
        }
    }
}

///////// File Uploading Code /////////



// let ref = firebase.storage().ref(`images/${firebase.auth().currentUser.uid}/`);
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob;


// return new Promise((resolve, reject) => {
//     const uploadUri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri
//     let uploadBlob = null



//     fs.readFile(uploadUri, 'base64')
//         .then((data) => {
//             return Blob.build(data, { type: `${response.mime};BASE64` })
//         })
//         .then((blob) => {
//             uploadBlob = blob
//             console.log("ffaa", uploadBlob)

//             return ref.put(uploadBlob, { contentType: response.mime })
//         })
//         .then(() => {
//             uploadBlob.close()
//             return ref.getDownloadURL()
//             console.log("ff")

//         })
//         .then((url) => {
//             firebase.auth().currentUser.updateProfile({
//                 photoURL: url
//             })