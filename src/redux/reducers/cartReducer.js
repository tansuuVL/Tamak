import {CLEAR_CART, ADD_CART, REMOVE_ITEM_IN_CARD, INCREASE_QUANITY, DECREASE_QUANITY, SET_TOTAL_OF_CARD_ITEM, SET_IN_TOTAL} from '../types'

const initialState = {
    cart: [],
    inTotal: 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CART:
            return {...state, cart: [...state.cart, action.payload]}
        case REMOVE_ITEM_IN_CARD:
            let cart0 = [...state.cart]
            cart0.splice(action.payload, 1)
            return {...state, cart: cart0}
        case INCREASE_QUANITY:
            let cart = [...state.cart]
            cart[action.payload].quanity++
            return {...state, cart: cart}
        case DECREASE_QUANITY:
            let cart2 = [...state.cart]
            if(cart2[action.payload].quanity > 1) {
                cart2[action.payload].quanity--
            }
            return {...state, cart: cart2}
        case SET_TOTAL_OF_CARD_ITEM:
            let cart3 = [...state.cart]
            cart3[action.payload.index].total = action.payload.total
            return {...state, cart: cart3}
        case SET_IN_TOTAL:
            return {...state, inTotal: action.payload}
        case CLEAR_CART:
            return {...state, cart: [], inTotal: 0}
        default:
            return state
    }
}

export default cartReducer