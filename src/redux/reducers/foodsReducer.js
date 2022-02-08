import {SET_ALL_FOODS, SET_FOOD} from '../types'

const initialState = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snakes: [],
    allFoods: {}
}

const foodsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FOOD:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        case SET_ALL_FOODS:
            return {...state, allFoods: action.payload }
        default:    
            return state
    }
}

export default foodsReducer