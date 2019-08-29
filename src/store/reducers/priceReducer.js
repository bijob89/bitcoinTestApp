const initState = {
    price: '',
    selectedCurrency: 'USD',
    currency: '',
    bitcoin: '',
    bitcoinValue: '',
    currencyValue: '',
    updatedAt: ''
}

const priceReducer = (state=initState, action) => {
    console.log(action)
    switch(action.type){
        case 'SET_CURRENT_PRICE':
            return {
                ...state,
                price: action.price.price.bpi,
                currency: action.price.currency,
                bitcoin: action.price.bitcoin,
                updatedAt: action.price.updatedAt
            }
        case 'SELECT_CURRENCY':
            return {
                ...state,
                selectedCurrency: action.currency.selectedCurrency,
                currency: action.currency.currency,
                bitcoin: 1
            }
        case 'SET_CURRENCY_VALUES':
            return {
                ...state,
                bitcoinValue: action.currency.bitcoinValue,
                currencyValue: action.currency.currencyValue
            }
        case 'SET_BITCOIN':
            return {
                ...state,
                bitcoin: action.bitcoin.bitcoin
            }
        default:
            return state
    }
}

export default priceReducer;