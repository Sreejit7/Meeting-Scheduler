import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { auth } from '../../firebase';
import { useAuth } from "../../hooks/useAuth";
import Login from "../Login";

const SignUp = () => {
  const {setUser} = useGlobalContext();
  const { createAccount } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState(false);
  
  useEffect(()=> {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    return auth.onAuthStateChanged( user => {
      setUser(user);
    });
  },[]);
  return (
    <>
    {!signIn && (
    <div className="login-container">
      <h1 className='login-title'>Join the Party!</h1>
        <form className = "login-form">
            <div className="form-item">
              <label>Email ID</label>
              <input className = "form-input" type='text'placeholder="Type your Email ID here" value={email} onChange={e=> setEmail(e.target.value)}/>
            </div>
            <div className="form-item">
              <label>Password</label>
              <input className = "form-input" type='password' placeholder="Type your password here" value={password} onChange={e=> setPassword(e.target.value)}/>
            </div>
            <div className="form-item">
              <label>Confirm Password</label>
              <input className = "form-input" type='password' placeholder="Retype your password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}/>
            </div>
        </form>
        <p className = "form-text">
            By signing-up, you agree to our
            Conditions of Use & Sale. Please check out our
            privacy policy, cookies & our Interent-Based Ads.
        </p>
        <button className="btn create-account-btn" onClick = {(e) => createAccount(e, email, password)} >Create Account</button>
        <p>Already have an account?</p>
        <button className="btn login-btn" onClick = {() => setSignIn(true)} >Sign In</button>
      </div>
      )}
      {signIn && <Login/>}
      </>
    )
  }

export default SignUp

