//组合redux子模块，导出store实例
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import movieReducer from "./modules/movie"

const store = configureStore({
    reducer:{
        user: userReducer,
        movie: movieReducer,
    }
})

export default store