import { combineReducers } from 'redux';
import priceReducer from './priceReducer'

const rootReducer = combineReducers({
    prices: priceReducer,
})

export default rootReducer;