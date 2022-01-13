import MenuIcon from '@material-ui/icons/Menu';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useValue } from '../context/context';
import { logout } from '../actions/userActions';

const DropMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dispatch } = useValue();
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickListener = (e) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickListener);
    return () => {
      document.removeEventListener('click', handleClickListener);
    };
  }, [isMenuOpen]);

  return (
    <div className='menu-container'>
      <MenuIcon className='btn-menu' onClick={handleClick} />
      {isMenuOpen && (
        <div className='drop-menu'>
          <Link to='/room/create' onClick={handleClick} className='menu-link'>
            My Rooms
          </Link>
          <Link to='/room/bookings' onClick={handleClick} className='menu-link'>
            Booked Rooms
          </Link>
          <button onClick={() => logout(dispatch)}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default DropMenu;
