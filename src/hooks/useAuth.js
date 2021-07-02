import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

export const useAuth = () => {
  const history = useHistory();
  const createAccount = (e, email, password) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      if(auth){
        console.log('user created!');
        history.push('/calendar');
      }
    })
    .catch((error) => alert(error.message));
  }
  const signIn = (e, email, password) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then((auth) => {
      if(auth){
        history.push('/calendar');
      }
    })
    .catch((error) => alert(error.message));
  }

  return{
    createAccount,
    signIn
  }
}
