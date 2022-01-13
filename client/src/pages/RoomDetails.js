import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRoom } from "../actions/roomActions";
import { useState, useEffect } from "react";
import { useValue } from "../context/context";
import Loading from "../components/Loading";
import moment from "moment";
import Error from "./Error";

const RoomDetails = () => {
  const { id: roomId } = useParams();
  const [room, setRoom] = useState({});
  const {
    dispatch,
    state: { isLoading, user },
  } = useValue();

  useEffect(() => {
    const fetchRoom = async () => {
      const roomDetails = await getRoom(roomId, dispatch);
      setRoom(roomDetails);
    };
    fetchRoom();
  }, [roomId, dispatch]);

  if (isLoading) return <Loading />;

  const { price, street, house, city, image, description, createdAt } = room;

  if (!city) {
    return <Error message="No such room could be found.." />;
  }
  const userId = user?.result?._id || user?.result?.googleId;

  return (
    <div className="container">
      <section className="single-room">
        <div className="single-room-images">
          <img src={image} alt={`${street}, ${city}`} />
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>Price: ₹{price * 90}</h6>
            <h6>
              Address: {street} {house}, {city}
            </h6>
            <h6>Added: {moment(createdAt).fromNow()} </h6>
          </article>
        </div>
        {userId !== room.ownerId && (
          <div className="btn-container">
            <Link to={`/room/book/${roomId}`} className="btn-primary">
              Book This room
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default RoomDetails;
