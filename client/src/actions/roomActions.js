import { END_LOADING, GET_ROOMS, START_LOADING, FILTER_ROOMS, BOOK_ROOM } from "../constants/constants"


const url = process.env.REACT_APP_API_URL + 'room';

export const createRoom = async (room, user) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json', authorization: `Bearer ${user?.token}`},
            body: JSON.stringify(room)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        return {success:false, msg: "Something went wrong!"};
    }
}

export const updateRoom = async (room, user) => {
    
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json', authorization: `Bearer ${user?.token}`},
            body: JSON.stringify(room)
        })
        const data = await response.json()
       return data
    } catch (error) {
        console.log(error)
        return {success:false, msg: "Something went wrong!"}
    }
}

export const getRooms = async (dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(data.success){
            dispatch({type: GET_ROOMS, payload: data.result})
        }
    } catch (error) {
        console.log(error)
    }
    dispatch({type: END_LOADING})
}

export const getUserRooms = async (user, dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const response = await fetch(url+"/userRooms", {
            headers: { authorization: `Bearer ${user?.token}` }
        })
        const data = response.json()
        dispatch({type: END_LOADING})
        return data
    } catch (error) {
        console.log(error)
        dispatch({type: END_LOADING})
        return {success:false, msg: 'Something went wrong!'}
    }
}

export const getBookedRooms = async (user, dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const response = await fetch(url+"/bookedRooms", {
            headers: { authorization: `Bearer ${user?.token}` }
        })
        const data = response.json()
        dispatch({type: END_LOADING})
        return data
    } catch (error) {
        console.log(error)
        dispatch({type: END_LOADING})
        return {success:false, msg: 'Something went wrong!'}
    }
}

export const getRoom = async (roomId, dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const response = await fetch(`${url}/${roomId}`);
        const data = await response.json();
        dispatch({type: END_LOADING})
        if(data.success) return data.result
        return {} 
    } catch (error) {
        console.log(error)
        dispatch({type: END_LOADING})
        return {}
    }
}


export const getCities = async () => {
    try {
        const response = await fetch( process.env.REACT_APP_API_URL + 'city')
        const data = await response.json();
        if(data.success) return data.result
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export const filterRooms = (rooms, city, price, dispatch) => {
    const filteredRooms = rooms.filter(room => {
        return (room.price <= price) && ( !city || room.city === city )
    })
    dispatch({ type: FILTER_ROOMS , payload: filteredRooms})
}

export const deleteRoom = async (roomId, user) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json', authorization: `Bearer ${user?.token}`},
            body: JSON.stringify({id: roomId})
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return {success: false, msg: 'Something went wrong!'}
    }
}

export const bookRoom = async (id, user, dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const response = await fetch(url+"/book", {
            method: "POST",
            headers: {'Content-Type': 'application/json', authorization: `Bearer ${user?.token}`},
            body: JSON.stringify({id})
        })
        const data = await response.json()
        dispatch({type: END_LOADING})
        return data
    } catch (error) {
        console.log(error)
        dispatch({type: END_LOADING})
        return {success: false, msg: 'Something went wrong'}
    }
}

export const bookRoomPayPal = async (id, user, dispatch) => {
    // dispatch({type: START_LOADING})
    try {
        const response = await fetch(url+"/bookPayPal", {
            method: "POST",
            headers: {'Content-Type': 'application/json', authorization: `Bearer ${user?.token}`},
            body: JSON.stringify({id})
        })
        const data = await response.json()
        
        // dispatch({type: END_LOADING})
        return {success: data.success, id: data?.PayPalId, msg: data?.msg}
    } catch (error) {
        console.log(error)
        // dispatch({type: END_LOADING})
        return {success: false, id: null, msg: 'Something went wrong'}
    }
}

export const cancelBooking = async (id, user) => {
    try{
        const response = await fetch (url + "/cancelBooking", {
            method: "POST",
            headers: {'Content-Type' : 'application/json', authorization: `Bearer ${user?.token}`},
            body: JSON.stringify({id})
        })
        const data = await response.json()
        return data
    } catch (error){
        console.log(error)
        return {success:false}
    }   
}