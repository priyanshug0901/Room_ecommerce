import Room from '../models/Room.js'
import mongoose from 'mongoose';
import paypal from '@paypal/checkout-server-sdk'


export const createRoom = async (req, res) => {
    if(!req?.userId) return res.status(401).json({success:false, msg:"You are not authorized to do this action!"})
    const room = req.body;
    if(req.body._id === null) {
        delete req.body._id; // this is to be sure that mongoose does not return _id:null in the result or change the name of the _id
    }
    const newRoom = new Room({...room, createdAt: new Date().toISOString(), ownerId: req.userId});
    try {
        await newRoom.save();
        res.status(200).json({success:true, result: newRoom})
    } catch (error) {
        res.status(409).json({err: error.message})
    }
}

export const updateRoom = async (req, res) => {
    if(!req?.userId) return res.status(401).json({success:false, msg:"You are not authorized to do this action!"})
    const room = req.body
    if(!mongoose.Types.ObjectId.isValid(room._id)) res.status(404).json({success:false, msg:"No room with this Id"})
    try {
        const result = await Room.findOne({_id: room._id, ownerId: req.userId})
        if (!result) return res.status(401).json({success:false, msg: "You are not authorized to update this room."})
        const updatedRoom = await Room.findByIdAndUpdate(room._id, room, {new:true})
        res.status(200).json({success:true, result:updatedRoom})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg:"Something went Wrong. Try later"})
    }
}

export const getRooms = async (req, res) => {
    
    const limit = 30;
    try {
        const rooms = await Room.find({bookedBy: ''}).sort({_id: -1}).limit(limit);
        res.status(200).json({success:true, result: rooms})
    } catch (error) {
        res.status(404).json({success: false, err:error.message})
    }
}

export const getUserRooms = async (req, res) => {

    if(!req?.userId) return res.status(401).json({success:false, msg: "You are not authorized to do this action."})

    const limit = 20
    try {
        const rooms = await Room.find({ownerId: req.userId}).sort({_id: -1}).limit(limit)
        res.status(200).json({success: true, result: rooms})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg: "Something went Wrong!"})
    }
}

export const getBookedRooms = async (req, res) => {
    if(!req?.userId) return res.status(401).json({success:false, msg: "You are not authorized to do this action."})

    const limit = 20
    try {
        const rooms = await Room.find({bookedBy: req.userId}).sort({_id: -1}).limit(limit)
        res.status(200).json({success: true, result: rooms})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg: "Something went Wrong!"})
    }
}

export const getRoom = async (req, res) => {
    const {id: roomId} = req.params
    try {
        const roomDetails = await Room.findById(roomId);
        res.status(200).json({ success:true, result: roomDetails })
    } catch (error) {

        console.log(error);
        res.status(404).json({ success: false, err: "Room not found" })
    }
}

export const deleteRoom = async (req, res) => {
    if(!req?.userId) return res.status(401).json({success:false, msg: "You are not authorized to do this action."})
    const {id: _id} = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({success:false, msg: "No room with this id"})
    try {
        const result = await Room.findOne({_id, ownerId: req.userId})
        if (!result) return res.status(401).json({success:false, msg: "You are not authorized to delete this room."})
        await Room.findByIdAndRemove(_id)
        res.status(200).json({ success: true, msg: "Room deleted successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg: "Something went wrong. Try again."})
    }

}

export const bookRoom = async (req, res) => {
    if(!req?.userId) return res.status(401).json({success:false, msg: "You are not authorized to do this action."})
    const {id: _id} = req.body
    try {
        let result = await Room.find({bookedBy: req.userId, price: 0})
        if(result.length) return res.status(400).json({success:false, msg: 'You already booked another free room'})
        result = await Room.findById(_id);
        if (!result) return res.status(404).json({success:false, msg: "No room with this id"})
        if(result.price > 0) return res.status(400).json({success:false, msg: "You can't book this room this way"})
        const updatedRoom = await Room.findByIdAndUpdate(_id, { bookedBy: req.userId}, {new: true})
        res.status(200).json({success:true, msg: 'Room booked successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg: "Something went wrong. Try later"})
    }
}

export const bookRoomPayPal = async (req, res) => {
    if(!req?.userId) return res.status(401).json({success:false, msg: "You are not authorized to do this action."})
    const {id: _id} = req.body
    let result
    try {
        result = await Room.findById(_id);
        if (!result) return res.status(404).json({success:false, msg: "No room with this id"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,  msg: "something went wrong"})
    }
    
    const Environment = 
    process.env.NODE_ENV === 'PRODUCTION' ?
    paypal.core.LiveEnvironment :
    paypal.core.SandboxEnvironment
    
    const paypalClient = new paypal.core.PayPalHttpClient(
        new Environment(
            process.env.PAYPAL_CLIENT_ID,
            process.env.PAYPAL_CLIENT_SECRET
        )
    )
    
    
    const request = new paypal.orders.OrdersCreateRequest();
    
    request.prefer("return=representation")
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {

                amount: {
                    currency_code: "USD",
                    value: result.price,
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: result.price,
                        },
                    },
                },
                items: [
                    {
                        name: `${result.street}, ${result.city}`,
                        unit_amount: {
                            currency_code: "USD",
                            value: result.price,
                        },
                        quantity: 1,
                    },
                ]

            }
        ]
    })
    
    try {
        const order = await paypalClient.execute(request)
        const updatedRoom = await Room.findByIdAndUpdate(_id, { bookedBy: req.userId}, {new: true})
        res.status(200).json({success:true, result: updatedRoom, PayPalId: order.result.id })
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,  msg: "something went wrong"})
    }
}

export const cancelBooking = async (req, res) => {
    if(!req?.userId) return res.status(401).json({success:false, msg: "You are not authorized to do this action."})
    const {id: _id} = req.body
    try {
        const result = await Room.find({_id, bookedBy: req.userId})
        if(!result.length) res.status(401).json({success: false, msg:"You are not allowed to do this action!"})
        const updatedRoom = await Room.findByIdAndUpdate(_id, {bookedBy: ""}, {new: true})
        res.status(200).json({success: true, msg: 'The booking canceled successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,  msg: "something went wrong"})
    }
}