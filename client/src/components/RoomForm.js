import { useRef } from 'react';
import imgToBase64 from '../utils/imgToBase64';
import ImageIcon from '@material-ui/icons/Image';
import CancelIcon from '@material-ui/icons/Cancel';
import { createRoom, updateRoom } from '../actions/roomActions';
import { useValue } from '../context/context';
import City from '../components/City';
import Alert from './Alert';
import { showAlert } from '../actions/alertActions';

const RoomForm = ({ room, setRoom, userRooms, setUserRooms }) => {
  const {
    state: { user, alert },
    dispatch,
  } = useValue();

  const handleChange = async (e) => {
    if (e.target.name === 'image') {
      try {
        const image = await imgToBase64(e.target.files[0]);
        setRoom({ ...room, image });
      } catch (error) {
        console.log(error);
      }
    } else {
      setRoom({ ...room, [e.target.name]: e.target.value });
    }
  };

  const roomImg = useRef();
  const handleCancel = () => {
    setRoom({ ...room, image: '' });
    roomImg.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (room?.city === '')
      return showAlert('danger', 'Please select city', dispatch);
    if (room?.image === '')
      return showAlert('danger', 'Please select image', dispatch);
    if (room?._id) {
      response = await updateRoom(room, user);
      if (response.success)
        setUserRooms([
          response.result,
          ...userRooms.filter((userRoom) => userRoom._id !== room._id),
        ]);
    } else {
      response = await createRoom(room, user);
      if (response.success) setUserRooms([response.result, ...userRooms]);
    }
    if (response.success) {
      showAlert(
        'success',
        `The room ${room?._id ? 'updated' : 'added'} successfully`,
        dispatch,
      );
      setRoom({
        price: 0,
        street: '',
        house: '',
        city: '',
        description: '',
        image: '',
        _id: null,
      });
      roomImg.current.value = null;
    } else {
      showAlert(
        'danger',
        `The room was not ${
          room?._id ? 'updated' : 'added'
        } successfully. try again`,
        dispatch,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {alert.isAlert && <Alert />}
      <div className='fields-container' style={{ width: '60vw' }}>
        <div className='form-group'>
          <label htmlFor='price'>Price per day (0 = free stay):</label>
          <input
            type='number'
            value={room.price}
            onChange={handleChange}
            name='price'
            id='price'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='street'>Street:</label>
          <input
            type='text'
            value={room.street}
            onChange={handleChange}
            name='street'
            id='street'
            className='form-control'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='house'>House No:</label>
          <input
            type='number'
            value={room.house}
            onChange={handleChange}
            name='house'
            id='house'
            className='form-control'
          />
        </div>
        <City handleChange={handleChange} cityValue={room?.city} />
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            value={room.description}
            onChange={handleChange}
            col='5'
            rows='7'
            name='description'
            id='description'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='image'>
            upload image:
            <input
              type='file'
              name='image'
              id='image'
              className='form-control'
              onChange={handleChange}
              accept='.png,.jpeg,.jpg'
              style={{ display: 'none' }}
              ref={roomImg}
            />
            <ImageIcon className='upload-images' />
          </label>

          {room?.image && (
            <div className='selectedImg-container'>
              <img src={room.image} className='selectedImg' alt='room' />
              <CancelIcon
                className='cancel-selectedImg'
                onClick={handleCancel}
              />
            </div>
          )}
        </div>
      </div>
      <div className='btn-container'>
        <button type='submit' className='btn-primary'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
