import { SET_USER_DATA, REMOVE_USER_DATA, ADD_BALANCE, MINUS_BALANCE, ADD_BALANCE_HISTORY} from "../types"

const initialState = {
    userData: {},
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {...state, userData: action.payload}
        case REMOVE_USER_DATA:
            return {...state, userData: {}}
        case ADD_BALANCE:
            return {...state, userData: {
                ...state.userData,
                balance: state.userData.balance + Number(action.payload)
            }}
        case MINUS_BALANCE:
            return {...state, userData: {
                ...state.userData,
                balance: state.userData.balance - action.payload
            }}
        case ADD_BALANCE_HISTORY:
            return {...state, userData: {...state.userData, balanceHistory: [...state.userData.balanceHistory, action.payload]}}
        default:
            return state
    }
}

export default userReducer