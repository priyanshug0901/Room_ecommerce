import CancelIcon from '@material-ui/icons/Cancel';
import { useState } from 'react';
import { showAlert } from '../actions/alertActions';
import { login } from '../actions/userActions';
import { useValue } from '../context/context';
import Alert from './Alert';
import GoogleLogin from './GoogleLogin';

const Login = ({ setIsLogin }) => {
  const {
    state: { alert },
    dispatch,
  } = useValue();

  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = async (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(userForm, dispatch);
    if (response.success) {
      setIsLogin(false);
    } else {
      showAlert('danger', response.msg, dispatch);
    }
  };

  return (
    <div className='modal-container'>
      <div className='modal-background'></div>
      <div className='modal'>
        <CancelIcon
          className='cancel-modal'
          onClick={() => setIsLogin(false)}
        />
        {alert.isAlert && <Alert />}
        <form onSubmit={handleSubmit}>
          <div className='fields-container'>
            <div className='form-group'>
              <label htmlFor='email'>Email: </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                className='form-control'
                value={userForm.email}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password: </label>
              <input
                type='password'
                name='password'
                id='password'
                required
                className='form-control'
                value={userForm.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='btn-container'>
            <button type='submit' className='btn-primary'>
              Login
            </button>
          </div>
        </form>
        <GoogleLogin setIsActive={setIsLogin} />
      </div>
    </div>
  );
};

export default Login;
