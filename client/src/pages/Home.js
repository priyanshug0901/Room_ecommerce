import RoomsContainer from '../components/RoomsContainer';
import { useEffect } from 'react';
import { getRooms } from '../actions/roomActions';
import { useValue } from '../context/context';

const Home = () => {
  const { dispatch } = useValue();
  useEffect(() => {
    getRooms(dispatch);
  }, [dispatch]);

  return <RoomsContainer />;
};

export default Home;
