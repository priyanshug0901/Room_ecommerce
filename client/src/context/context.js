import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  rooms: [],
  filteredRooms: [],
  user: {},
  isLoading: true,
  alert: { isAlert: false, type: '', message: '' },
};

const context = createContext(initialState);

export const useValue = () => {
  return useContext(context);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};
