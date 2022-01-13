import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import BookedRoom from '../components/BookedRoom';
import { useValue } from '../context/context';
import { getBookedRooms } from '../actions/roomActions';
import Alert from '../components/Alert';

const MyBookings = () => {
  const {
    state: { user, isLoading, alert },
    dispatch,
  } = useValue();
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getBookedRooms(user, dispatch);
      if (response.success) setBookedRooms(response.result);
    };
    fetchRooms();
  }, [user, dispatch]);

  if (isLoading) return <Loading />;
  return (
    <div className='container'>
      <section className='section-title'>
        <h4>Your Booked Rooms</h4>
        <div />
      </section>
      {alert.isAlert && <Alert />}
      {!bookedRooms.length ? (
        <div className='empty-search'>
          <h3>No rooms booked yet!</h3>
        </div>
      ) : (
        <section className='roomsList'>
          <div className='roomsList-center'>
            {bookedRooms.map((room) => (
              <BookedRoom
                room={room}
                key={room._id}
                bookedRooms={bookedRooms}
                setBookedRooms={setBookedRooms}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyBookings;
