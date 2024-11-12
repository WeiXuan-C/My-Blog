//用户相关的数据管理
import { createSlice } from "@reduxjs/toolkit";
import { setToken as setLocalToken , getToken, request, removeToken } from "../../utils"

const userStore = createSlice({
    name:"user",
    initialState:{
        token: getToken() || '',
        userInfo:{},
        status: 200
    },
    //同步修改方法
    reducers:{
        setToken (state, action) {
            state.token = action.payload
            setLocalToken(action.payload)
            state.status = 200
        },
        setUserInfo(state,action){
            state.userInfo = action.payload
            state.status = 200
        },
        clearUserInfo(state){
            state.userInfo = {}
            state.token = ''
            removeToken()
            state.status = 401
        },
        setStatus(state, action){
            state.status = action.payload
        }
    }
})

//1. 解构actionCreator
//2. 获取reducer函数
const {setToken, setUserInfo, clearUserInfo, setStatus}= userStore.actions
const userReducer = userStore.reducer

//3. 异步方法 完成登录获取token
const loginHandler = (loginForm)=>{
    return async (dispatch) => {
        //发送异步请求
        const response = await request.get(`/user?username=${loginForm.username}&password=${loginForm.password}`)
        if(response.data && response.data.length > 0){
            dispatch(setToken(response.data[0].token))
        }else{
            dispatch(setStatus(401))
        }
    }
}

const fetchUserInfo = ()=>{
    return async (dispatch) => {
        try{
            const response = await request.get(`/user?token=${getToken()}`)
            console.log(response.data)
            if(response.data && response.data.length > 0){
                dispatch(setUserInfo(response.data[0]))
            }else{
                dispatch(setStatus(401))
                dispatch(clearUserInfo())
            }
        }catch(error){
            dispatch(setStatus(401))
            dispatch(clearUserInfo())
        }
    }
}

export {loginHandler, fetchUserInfo, setToken, setUserInfo, clearUserInfo}
export default userReducer