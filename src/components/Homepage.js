import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core';
import DisplayCurrencyText from './DisplayCurrencyText';
import DisplayTime from './DisplayTime';
import DisplayGraph from './DisplayGraph';
import CheckCurrency from './CheckCurrency';
import AreaChart from './AreaChart';


const styles = theme => ({
    bitcoinGrid: {
        border: '1px solid #eee'
    }
});

class Homepage extends Component {
    render() {
        const { classes } = this.props
        return (
            <Grid item container spacing={2}>
                <Grid item xs={6}>

                    <Grid item>
                        <DisplayCurrencyText />
                    </Grid>
                    <Grid item>
                        {/* <DisplayTime /> */}
                    </Grid>
                    <CheckCurrency />
                </Grid>
                <Grid item xs={6}>
                    <AreaChart />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Homepage)
