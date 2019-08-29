import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/styles';
import Homepage from './components/Homepage';
import AreaChart from './components/AreaChart'

const styles = theme => ({
  bitcoinGrid:{
    border:'2px solid #eee',
    borderRadius: '15px',
    margin: '10px',
    padding: '10px'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props
  return (
    <Grid item xs={12}>
      <Grid item xs={8} className={classes.bitcoinGrid}>
          <Homepage />
          {/* <AreaChart /> */}
      </Grid>
    </Grid>
  );
}
}

export default withStyles(styles)(App);
