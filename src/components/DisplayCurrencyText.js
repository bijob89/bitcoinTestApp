import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';


export class DisplayCurrencyText extends Component {
    render() {
        const { bitcoin, currency, selectedCurrency, updatedAt } = this.props
        return (
            <Grid item>
                <Typography variant="caption">{bitcoin} Bitcoin equals</Typography>
                <Typography variant="h4">{currency} {selectedCurrency}</Typography>
                <Typography variant="caption">{updatedAt} disclaimer</Typography>
            </Grid>
        )
    }
}


const mapStateToProps = state => {
    return {
        bitcoin: state.prices.bitcoin,
        currency: state.prices.currency,
        selectedCurrency: state.prices.selectedCurrency,
        updatedAt: state.prices.updatedAt
    }
}

export default connect(mapStateToProps)(DisplayCurrencyText)
