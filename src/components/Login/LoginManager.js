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
          photo: photoURL
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

        console.log('fb user after signed in', user);

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

//   export const CreateWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);

//       updateUserName(user.name)
//       // console.log(res);

//     })
//     .catch(error => {
//       // dont understand
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       // console.log(errorCode, errorMessage);
//     });
//   }

//  export const SignInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       // Signed in
//       const newUserInfo = { ...user };
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo)
//       history.replace(from);
//       console.log('sign in user info', res.user);
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
//  } 
 
//  const updateUserName = (name) => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name
//     }).then(function () {
//       // Update successful.
//       console.log("user name updated successfully");
//     }).catch(function (error) {
//       // An error happened.
//       console.log(error);
//     });
//   }

 