import { END_LOADING, GET_ROOMS, START_LOADING, FILTER_ROOMS, SET_USER, SHOW_ALERT, CLOSE_ALERT } from "../constants/constants.js";



const reducer = (state, action) => {
    switch (action.type) {
        
        case GET_ROOMS:
            return {...state, rooms: action.payload, filteredRooms: action.payload }    
        
        case START_LOADING:
            return {...state, isLoading: true}

        case END_LOADING:
            return {...state, isLoading: false}

        case FILTER_ROOMS:
            return {...state, filteredRooms: action.payload}

        case SET_USER:
            return {...state, user: action.payload}
        
        case SHOW_ALERT:
            return{...state, alert: {isAlert: true, type: action.payload.type, message: action.payload.message}}
        
        case CLOSE_ALERT:
            return{...state, alert: {isAlert: false, type: '', message: ''}}
        default:
            throw new Error('There is no action matches');
    }
}

export default reducer;