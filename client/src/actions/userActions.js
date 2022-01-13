import { SET_USER } from "../constants/constants"

const url = process.env.REACT_APP_API_URL + 'user';


export const register = async (userForm, dispatch) => {
    try {
        const response = await fetch( url + '/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userForm)
        })
        const data = await response.json();
        if(data.success){
            const user = { result: data.result, token: data.token }
            setUser(user, dispatch)
            localStorage.setItem('profile',  JSON.stringify(user) )
            return {success: true}
        }else{
            return data
        }
    } catch (error) {
        console.log(error)
        return {success:false, msg: error.message}
    }
}


export const login = async (userForm, dispatch) => {
    try {
        const response = await fetch(url+"/signIn", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userForm)
        })
        const data = await response.json()
        if(data.success){
            const user = {result: data.result, token: data.token}
            setUser(user, dispatch)
            localStorage.setItem('profile',  JSON.stringify(user) )
            return {success:true}
        }else{
            return data
        }
    } catch (error) {
        console.log(error)
        return {success:false, msg: error.message}
    }
    
}

export const logout =  (dispatch) => {
    localStorage.clear()
    setUser(null, dispatch)
}


export const setUser = (payload, dispatch) => {

    dispatch({ type: SET_USER, payload})
}