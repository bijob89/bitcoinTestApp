export const getBitcoinPrice = (price) => {
    return (dispatch, getState) => {
        console.log(getState)
        dispatch({ type: 'SET_CURRENT_PRICE', price })
    }
}

export const setCurrencyType = (currency) => {
    return (dispatch, getState) => {
        // console.log(getState)
        dispatch({ type: 'SELECT_CURRENCY', currency })
    }
}

export const setCurrencyValues = (currency) => {
    return (dispatch, getState) => {
        // console.log(getState)
        dispatch({ type: 'SET_CURRENCY_VALUES', currency })
    }
}


export const setBitcoinValue = (bitcoin) => {
    return (dispatch, getState) => {
        // console.log(getState)
        dispatch({ type: 'SET_BITCOIN', bitcoin })
    }
}
