import Error from './Error';
import { useValue } from '../context/context';

const Protected = ({ children }) => {
  const {
    state: { user },
  } = useValue();

  if (user?.token) return children;

  return <Error message='Register or login to access this page.' />;
};

export default Protected;
