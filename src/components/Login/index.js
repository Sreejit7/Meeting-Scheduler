import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {auth} from '../../firebase';
import {useGlobalContext} from '../../hooks/useGlobalContext';
import { useAuth } from '../../hooks/useAuth';
import SignUp from '../SignUp';

const Login = () => {
  const {setUser} = useGlobalContext();
  const { signIn } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);

  useEffect(()=> {
    setEmail('');
    setPassword('');
    return auth.onAuthStateChanged( user => {
      setUser(user);
    });;
  },[]);
  
  return (
    <>
    {!signUp && <div className="login-container">
      <h1 className='login-title'>Sign-in</h1>
          <form className = "login-form">
              <div className="form-item">
                <label>Email ID</label>
                <input className = "form-input" type='text'placeholder="Type your Email ID here" value={email} onChange={e=> setEmail(e.target.value)}/>
              </div>
              <div className="form-item">
                <label>Password</label>
                <input className = "form-input" type='password' placeholder="Type your password here" value={password} onChange={e=> setPassword(e.target.value)}/>
              </div>
              <button className="btn login-btn" type="submit" onClick = {(e) => signIn(e, email, password)} >
                Sign-in
              </button>
          </form>
          <p className = "form-text">
              By signing-in, you agree to our
              Conditions of Use & Sale. Please check out our
              privacy policy, cookies & our Interent-Based Ads.
          </p>
          <p>Don't have an account?</p>
          <button className="btn create-account-btn" onClick = {() => setSignUp(true)} >Create Account</button>
    </div>}
    {signUp && <SignUp/>}
    </>
  )
}

export default Login