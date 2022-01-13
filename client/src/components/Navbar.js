import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import Login from './Login';
import Register from './Register';
import { useValue } from '../context/context';
import { logout, setUser } from '../actions/userActions';
import decode from 'jwt-decode';
import { Avatar } from '@material-ui/core';
import DropMenu from './DropMenu';

const Navbar = () => {
  const {
    state: { user },
    dispatch,
  } = useValue();

  if (user?.token) {
    const decodedToken = decode(user.token);
    // if token has expired
    if (decodedToken.exp * 1000 < new Date().getTime()) logout(dispatch);
  }

  useEffect(() => {
    if (!user?.token) {
      const userProfile = JSON.parse(localStorage.getItem('profile'));
      if (userProfile?.token) {
        setUser(userProfile, dispatch);
      }
    }
  }, []);

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const openRegister = () => {
    setIsRegister(true);
  };

  const openLogin = () => {
    setIsLogin(true);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='nav-center'>
          <div className='nav-header'>
            <Link to='/' className='logo'>
              <img src={logo} alt="You're Welcome" />
            </Link>
            <div className='nav-links'>
              {user?.token ? (
                <>
                  <Avatar>{user.result.name.charAt(0)}</Avatar>
                  <DropMenu />
                </>
              ) : (
                <>
                  <button onClick={openRegister}>Register</button>
                  <button onClick={openLogin}>Login</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isLogin && <Login setIsLogin={setIsLogin} />}
      {isRegister && <Register setIsRegister={setIsRegister} />}
    </>
  );
};

export default Navbar;
