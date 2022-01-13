import { useEffect, useRef } from 'react';
import { CLOSE_ALERT } from '../constants/constants';
import { useValue } from '../context/context';
import CancelIcon from '@material-ui/icons/Cancel';

const Alert = () => {
  const {
    state: { alert },
    dispatch,
  } = useValue();
  const alertTime = useRef();
  const alertDiv = useRef();
  useEffect(() => {
    alertDiv.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });

    alertTime.current = setTimeout(() => {
      dispatch({ type: CLOSE_ALERT });
    }, 5000);
    return () => {
      clearTimeout(alertTime.current);
    };
  }, [dispatch]);

  const handleClick = () => {
    dispatch({ type: CLOSE_ALERT });
    clearTimeout(alertTime.current);
  };

  return (
    <div className={`alert ${alert.type}`} ref={alertDiv}>
      <CancelIcon className='cancel-alert' onClick={handleClick} />
      <p>{alert.message}</p>
    </div>
  );
};

export default Alert;
