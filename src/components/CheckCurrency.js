import React, { Component } from 'react'
import { Grid, InputLabel, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core';
import { getBitcoinPrice, setBitcoinValue, setCurrencyType, setCurrencyValues } from '../store/actions/priceActions';
import { connect } from 'react-redux';


const styles = theme => ({
    margin: {
        margin: theme.spacing(1),
        width: 150,
        
      },
      textField:{
          width: 150,
          height: 10
      }
});

class CheckCurrency extends Component {
    state = {
        bitcoinValue: '',
        currencyValue: ''
    }

    async fetchBitCoinPrice(){
        const data = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        const bitCoinPriceData = await data.json()
        console.log(bitCoinPriceData)
        this.props.getBitcoinPrice({
            price: bitCoinPriceData, 
            bitcoin: 1, 
            currency: bitCoinPriceData['bpi']['USD']['rate'],
            updatedAt: bitCoinPriceData['time']['updated']
        })
    }
    
    componentDidMount(){
        this.fetchBitCoinPrice()
    }

    componentWillReceiveProps(nextProps){
        const { bitcoin, currency } = nextProps
        this.setState({bitcoinValue: bitcoin, currencyValue: currency})
        this.props.setCurrencyValues({bitcoinValue: bitcoin, currencyValue: currency})
    }

    displayCurrencys = () => {
        const { price } = this.props
        const currencies = Object.keys(price)
        return currencies.map(currency => (<MenuItem key={currency} value={currency}>{currency}</MenuItem>))
    }

    handleBitcoinChange(value){
        if(value === ''){
            this.setState({bitcoinValue: '', currencyValue: ''})
            this.props.setCurrencyValues({bitcoinValue: '', currencyValue: ''})
        }else{
            const { currency } = this.props
            let result = parseFloat(currency.replace(/\,/g,"")) * parseFloat(value.replace(/\,/g,""))
            this.setState({bitcoinValue: value, currencyValue: result})
            this.props.setCurrencyValues({bitcoinValue: value, currencyValue: result})
        }
    }

    handleCurrencyValueChange(value){
        if(value === ''){
            this.setState({bitcoinValue: '', currencyValue: ''})
            this.props.setCurrencyValues({bitcoinValue: '', currencyValue: ''})
        }else{
            const { currency } = this.props
            let result = parseFloat(value.replace(/\,/g,"")) / parseFloat(currency.replace(/\,/g,""))
            this.setState({bitcoinValue: result, currencyValue: value})
            this.props.setCurrencyValues({bitcoinValue: result, currencyValue: value})
        }
        
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        const { classes, bitcoin, price, currency, selectedCurrency } = this.props
        const { bitcoinValue, currencyValue } = this.state
        return (
            <Grid item>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-name"
                            label="BitCoin Value"
                            className={classes.textField}
                            value={bitcoinValue}
                            onChange={(e) => this.handleBitcoinChange(e.target.value)}
                            margin="dense"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="bitcoin-customized-select">BitCoin</InputLabel>
                            <Select
                            // margin="dense"
                            value="BitCoin"
                            variant="outlined"
                            inputProps={{
                                id: 'bitcoin-customized-select',
                            }}
                            >
                                <MenuItem value="BitCoin">BitCoin</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-name"
                            label={selectedCurrency}
                            className={classes.textField}
                            value={currencyValue}
                            onChange={(e) => this.handleCurrencyValueChange(e.target.value)}
                            margin="dense"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="currency-customized-select">Currency</InputLabel>
                            <Select
                            margin="dense"
                            value={selectedCurrency}
                            onChange={(e) => this.props.setCurrencyType({selectedCurrency: e.target.value, currency: price[e.target.value]['rate']})}
                            inputProps={{
                                id: 'currency-customized-select',
                            }}
                            >
                                {this.displayCurrencys()}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        price: state.prices.price,
        bitcoin: state.prices.bitcoin,
        currency: state.prices.currency,
        selectedCurrency: state.prices.selectedCurrency,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBitcoinPrice: (price) => dispatch(getBitcoinPrice(price)),
        setCurrencyType: (currency) => dispatch(setCurrencyType(currency)),
        setCurrencyValues: (currency) => dispatch(setCurrencyValues(currency)),
        setBitcoinValue: (bitcoin) => dispatch(setBitcoinValue(bitcoin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckCurrency))
