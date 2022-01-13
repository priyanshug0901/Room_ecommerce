import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import { cancelBooking } from "../actions/roomActions";
import { useValue } from "../context/context";
import { showAlert } from "../actions/alertActions";
import MenuContainer from "./MenuContainer";

const BookedRoom = ({ room, bookedRooms, setBookedRooms }) => {
  const {
    state: { user },
    dispatch,
  } = useValue();
  const { _id: roomId, price, street, city, image } = room;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = async () => {
    const response = await cancelBooking(roomId, user);
    if (response.success) {
      setBookedRooms(
        bookedRooms.filter((bookedRoom) => bookedRoom._id !== roomId)
      );
      showAlert("success", response.msg, dispatch);
    } else {
      showAlert("danger", response.msg, dispatch);
    }
  };

  return (
    <article className="room">
      <div className="edit-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <MoreVertIcon fontSize="large" />
      </div>
      {isMenuOpen && (
        <MenuContainer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
          <button onClick={handleClick}>Cancel Booking</button>
        </MenuContainer>
      )}
      <div className="img-container">
        <img src={image} alt="room" />
        <div
          className="price-top"
          style={!price > 0 ? { background: "#698f3f" } : {}}
        >
          <h6>{price > 0 ? `₹${price * 90}` : "Free"}</h6>
        </div>
        <Link to={`/room/${roomId}`} className="btn-primary room-link">
          Details
        </Link>
      </div>
      <p className="room-info">
        {street}, {city}
      </p>
    </article>
  );
};

export default BookedRoom;
