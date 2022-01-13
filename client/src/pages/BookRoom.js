import { useParams, useHistory } from 'react-router-dom';
import { useValue } from '../context/context';
import { bookRoom } from '../actions/roomActions';
import PayPal from '../components/PayPal';
import Alert from '../components/Alert';
import { showAlert } from '../actions/alertActions';
import Error from './Error';
import { Link } from 'react-router-dom';

const BookRoom = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    state: { rooms, user, alert },
    dispatch,
  } = useValue();
  const room = rooms.find((room) => room._id === id);
  if (!room?._id) return <Error message='OOPs! No direct access' />;
  const { image, street, city, price } = room;

  const handleClick = async () => {
    const response = await bookRoom(id, user, dispatch);
    if (response.success) {
      history.push('/room/bookings');
    } else {
      showAlert('danger', response.msg, dispatch);
    }
  };
  const userId = user?.result?.googleId || user?.result?._id;
  if (userId === room?.ownerId)
    return <Error message='You are not allowed to do this action!' />;

  return (
    <section className='form-container'>
      <div className='section-title'>
        <h4>Booking Info:</h4>
        <div />
      </div>
      <div className='fields-container checkout-card'>
        <div className='form-group'>
          <Link to={`/room/${id}`}>
            <img src={image} alt={city} width='200' />
          </Link>
        </div>
        <div className='form-group'>
          <label>
            {street}, {city}
          </label>
        </div>
        <div className='form-group'>
          <label>{price ? `Price: $${price}` : 'Free Staying'}</label>
        </div>
      </div>
      <div className='btn-container'>
        {alert.isAlert && <Alert />}
        {price > 0 ? (
          <PayPal roomId={id} />
        ) : (
          <button className='btn-primary' onClick={handleClick}>
            Confirm Booking
          </button>
        )}
      </div>
    </section>
  );
};

export default BookRoom;
