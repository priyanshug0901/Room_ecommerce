import { useEffect, useState } from 'react';
import RoomForm from '../components/RoomForm';
import { useValue } from '../context/context';
import UserRoom from '../components/UserRoom';
import Loading from '../components/Loading';
import { getUserRooms } from '../actions/roomActions';

const MyRooms = () => {
  const {
    state: { user, isLoading },
    dispatch,
  } = useValue();

  const [room, setRoom] = useState({
    price: 0,
    street: '',
    house: '',
    city: '',
    description: '',
    image: '',
    _id: null,
  });

  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getUserRooms(user, dispatch);
      if (response.success) {
        setUserRooms(response.result);
      }
    };
    fetchRooms();
  }, [dispatch, user]);

  return (
    <>
      <section className='form-container'>
        <div className='section-title'>
          <h4>{room?._id ? 'Edit' : 'Add Room'}</h4>
          <div />
        </div>
        <RoomForm
          room={room}
          setRoom={setRoom}
          userRooms={userRooms}
          setUserRooms={setUserRooms}
        />
      </section>
      <section className='roomsList' style={{ paddingTop: '0' }}>
        <div className='userRooms-title'>
          <h3>Added Rooms: </h3>
        </div>
        {isLoading ? (
          <Loading />
        ) : !userRooms.length ? (
          <div className='empty-search'>
            <h3>No rooms added yet!</h3>
          </div>
        ) : (
          <div className='roomsList-center'>
            {userRooms.map((room) => (
              <UserRoom
                room={room}
                key={room._id}
                setRoom={setRoom}
                userRooms={userRooms}
                setUserRooms={setUserRooms}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default MyRooms;
