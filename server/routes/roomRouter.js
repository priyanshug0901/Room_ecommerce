import { Router } from "express";
import { getRooms, getUserRooms, getBookedRooms, createRoom, getRoom, deleteRoom, updateRoom, bookRoom, bookRoomPayPal, cancelBooking } from '../controllers/roomControllers.js'
import auth from "../middleware/auth.js";

const roomRouter = Router();


roomRouter.get("/", getRooms);

roomRouter.get("/userRooms", auth,  getUserRooms)
roomRouter.get("/bookedRooms", auth,  getBookedRooms)
roomRouter.post("/cancelBooking", auth,  cancelBooking)

roomRouter.get("/:id", getRoom);

roomRouter.post("/", auth, createRoom)
roomRouter.patch("/", auth, updateRoom)

roomRouter.delete("/", auth, deleteRoom )

roomRouter.post("/book", auth, bookRoom)
roomRouter.post("/bookPayPal", auth, bookRoomPayPal)

export default roomRouter;