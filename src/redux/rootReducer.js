import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import foodsReducer from "./reducers/foodsReducer";
import userReducer from "./reducers/userReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    foods: foodsReducer,
    user: userReducer,
    cart: cartReducer
})