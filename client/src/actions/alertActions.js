import { SHOW_ALERT } from '../constants/constants'


export const showAlert = (type, message, dispatch) => {
    dispatch({ type: SHOW_ALERT, payload: {type, message} })
    // window.scrollTo({
    //     top: 0,
    //     behavior: "smooth"
    // });
}