import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import Error from "./pages/Error";
import MyRooms from "./pages/MyRooms";
import Protected from "./pages/Protected";
import BookRoom from "./pages/BookRoom";
import MyBookings from "./pages/Mybookings";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/room/create">
            <Protected>
              <MyRooms />
            </Protected>
          </Route>
          <Route exact path="/room/book/:id">
            <Protected>
              <BookRoom />
            </Protected>
          </Route>
          <Route exact path="/room/bookings">
            <Protected>
              <MyBookings />
            </Protected>
          </Route>
          <Route exact path="/room/:id">
            <RoomDetails />
          </Route>
          <Route>
            <Error message="Page not found!" />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
