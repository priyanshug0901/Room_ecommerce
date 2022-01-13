import { useEffect, useState } from "react";
import { filterRooms } from "../actions/roomActions";
import { useValue } from "../context/context";
import City from "./City";

const RoomsFilter = () => {
  const {
    state: { rooms },
    dispatch,
  } = useValue();

  const { minPrice, maxPrice } = rooms.reduce(
    (minMax, room) => {
      if (minMax.minPrice > room.price) minMax.minPrice = room.price;
      if (minMax.maxPrice < room.price) minMax.maxPrice = room.price;
      return { minPrice: minMax.minPrice, maxPrice: minMax.maxPrice };
    },
    { minPrice: 0, maxPrice: 0 }
  );

  const [price, setPrice] = useState(maxPrice);
  const [city, setCity] = useState("");

  useEffect(() => {
    setPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    filterRooms(rooms, city, price, dispatch);
  }, [city, price]);

  const handleChange = async (e) => {
    if (e.target.name === "price") {
      setPrice(e.target.value);
    }
    if (e.target.name === "city") {
      setCity(e.target.value);
    }
  };
  return (
    <section className="filter-container">
      <div className="section-title">
        <h4>Find Your Room</h4>
        <div />
      </div>
      <form className="filter-form">
        <City filter={true} handleChange={handleChange} cityValue={city} />
        <div className="form-group">
          <label htmlFor="price">Room Price ₹{price * 90}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            onChange={handleChange}
            className="form-control"
            value={price}
          />
        </div>
      </form>
    </section>
  );
};

export default RoomsFilter;
