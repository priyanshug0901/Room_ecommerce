import { memo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Room = memo(({ room }) => {
  const { _id: roomId, price, street, city, image, createdAt } = room;

  return (
    <article className="room">
      <div className="img-container">
        <img src={image} alt="room" />
        <div
          className="price-top"
          style={!price > 0 ? { background: "#698f3f" } : {}}
        >
          <h6>{price > 0 ? `₹${price * 90}` : "Free"}</h6>
        </div>
        <div className="time-top">{moment(createdAt).fromNow()}</div>
        <Link to={`/room/${roomId}`} className="btn-primary room-link">
          Details
        </Link>
      </div>
      <p className="room-info">
        {street}, {city}
      </p>
    </article>
  );
});

export default Room;
