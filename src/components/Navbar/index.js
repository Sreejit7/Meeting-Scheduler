import React, { useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const { user, setUser } = useGlobalContext();
  const history = useHistory();
  useEffect(() => {
    return auth.onAuthStateChanged( user => {
      setUser(user);
    });
  },[user]);

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
    history.replace('/');
  }
  return (
    <header className="header">
      <h3>Scheduler</h3>
      {user && <FiLogOut cursor="pointer"  size={18} onClick={(e) => signOut(e)} />}
    </header>
  )
}

export default Navbar
