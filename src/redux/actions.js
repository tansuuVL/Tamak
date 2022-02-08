import { CLEAR_CART, MINUS_BALANCE, ADD_BALANCE, ADD_CART, AUTH_USER, DECREASE_QUANITY, INCREASE_QUANITY, LOGOUT_USER, REMOVE_ITEM_IN_CARD, SET_ALL_FOODS, SET_IN_TOTAL, SET_TOTAL_OF_CARD_ITEM, SET_USER_DATA, ADD_BALANCE_HISTORY } from "./types"


export const getAllFoods = () => async dispatch => {

    const responce = await fetch("http://localhost:8000/breakfast")
    const breakfastjson = await responce.json()

    const responce2 = await fetch("http://localhost:8000/lunch")
    const lunchjson = await responce2.json()
    
    const responce3 = await fetch("http://localhost:8000/dinner")
    const dinnerjson = await responce3.json()

    const responce4 = await fetch("http://localhost:8000/snakes")
    const snakesjson = await responce4.json()

    const body = {
        breakfast: breakfastjson,
        lunch: lunchjson,
        dinner: dinnerjson,
        snakes: snakesjson
    }

    dispatch({type: SET_ALL_FOODS, payload: body})
}

// AUTH

export const setUserData = body => ({type: SET_USER_DATA, payload: body})
export const authUser = () => ({type: AUTH_USER})
export const logoutUser = () => ({type: LOGOUT_USER})

// CART

export const addToCart = payload => ({type: ADD_CART, payload})
export const removeCardItem = payload => ({type: REMOVE_ITEM_IN_CARD, payload})
export const increaseQuanity = payload => ({type: INCREASE_QUANITY, payload})
export const decreaseQuanity = payload => ({type: DECREASE_QUANITY, payload})
export const setTotalOfCartItem = (data) => ({type: SET_TOTAL_OF_CARD_ITEM, payload: data})
export const setInTotal = payload => ({type: SET_IN_TOTAL, payload})
export const clearCart = () => ({type: CLEAR_CART})
// USER

export const addBalance = payload => ({type: ADD_BALANCE, payload})
export const minusBalance = payload => ({type: MINUS_BALANCE, payload})
export const addBalanceHistory = payload => ({type: ADD_BALANCE_HISTORY, payload})