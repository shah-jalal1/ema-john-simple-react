import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const  initialieLoginFrameWork = () => {
    // firebase.initializeApp(firebaseConfig)
    // if (!firebase.apps.length === 0) {
    //     firebase.initializeApp(firebaseConfig)
    //  }
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
     }else {
        firebase.app(); // if already initialized, use that one
     }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInuser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
         return signedInuser;
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
     return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var user = result.user;
        user.success = true;

        var accessToken = credential.accessToken;
        return user;
        
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const signedOutuser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
         return signedOutuser;
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  export const CreateWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user ;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name)
      
      return newUserInfo;

    })
    .catch(error => {
      // dont understand
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
    });
  }

 export const SignInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
   
    })
    .catch((error) => {
      const newUserInfo = { };
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo
    });
 } 
 
 const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      // Update successful.
      console.log("user name updated successfully");
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

 