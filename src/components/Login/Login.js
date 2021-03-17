
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { CreateWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initialieLoginFrameWork, SignInWithEmailAndPassword } from './LoginManager';


function Login() {

  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photoURL: ''
  });

  initialieLoginFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    // console.log(e.target.name, e.target.value);
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passWordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = (isPasswordValid && passWordHasNumber);
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }

  const handleSubmit = (e) => {
    
    if (newUser && user.email && user.password) {
      // console.log("submitting");
      CreateWithEmailAndPassword(user.name, user.email, user.pas)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
      
    }

    if (!newUser && user.email && user.password) {
      SignInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    e.preventDefault(); // For no reload 
  }



  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign In Using Facebook</button>
      {
        user.isSignedIn &&
        <div>
          <p> Welcome, {user.name} </p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your Name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} Susseccfully</p>
      }

    </div>
  );
}

export default Login;
