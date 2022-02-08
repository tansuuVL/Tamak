import { AUTH_ADMIN, AUTH_USER, LOGOUT_ADMIN, LOGOUT_USER } from "../types"

const initialState = {
    isAuth: false,
    isAdmin: false,
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_USER:
            return {...state, isAuth: true}
        case LOGOUT_USER:
            return {...state, isAuth: false}
        case AUTH_ADMIN:
            return {...state, isAdmin: true}
        case LOGOUT_ADMIN:
            return {...state, isAdmin: false}
        default:
            return state
    }
}
