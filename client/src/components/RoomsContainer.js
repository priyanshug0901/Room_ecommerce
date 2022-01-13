import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import Loading from '../components/Loading';
import { useValue } from '../context/context';

const RoomsContainer = () => {
  const { state } = useValue();
  return (
    <>
      <RoomsFilter />
      {state.isLoading ? <Loading /> : <RoomsList />}
    </>
  );
};

export default RoomsContainer;
