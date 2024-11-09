import { createSlice } from "@reduxjs/toolkit";
import { setToken as setLocalToken , getToken, request, removeToken } from "../../utils"

const userStore = createSlice({
    name:"user",
    initialState:{
        token: getToken() || '',
        userInfo:{}
    },
    reducers:{
        setToken (state, action) {
            state.token = action.payload
            setLocalToken(action.payload)
        },
        setUserInfo(state,action){
            state.userInfo = action.payload
        },
        clearUserInfo(state){
            state.userInfo = {}
            state.token = ''
            removeToken()
        }
    }
})


const {setToken, setUserInfo, clearUserInfo}= userStore.actions
const userReducer = userStore.reducer

const loginHandler = (loginForm)=>{
    return async (dispatch) => {
        const response = await request.get(`/user?username=${loginForm.username}&password=${loginForm.password}`)
        dispatch(setToken(response.data[0].token))
    }
}

const fecthUserInfo = ()=>{
    return async (dispatch) => {
        const response = await request.get(`/user?token=${getToken()}`)
        dispatch(setUserInfo(response.data[0]))
    }
}


export {loginHandler, fecthUserInfo, setToken, setUserInfo, clearUserInfo}
export default userReducer