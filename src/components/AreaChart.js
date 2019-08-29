import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Button } from '@material-ui/core';

class AreaChart extends Component {
      
      state = {
        currentDate: '',
        selection: 'one_month',
        options: {
          annotations: {
          yaxis: [{
            y: 7000,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Support',
              style: {
                color: "#fff",
                background: '#00E396'
              }
            }
          }],
          xaxis: [{
            x: new Date('14 Nov 2015').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'BitCoin',
              style: {
                color: "#fff",
                background: '#775DD0'
              }
            }
          }]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date('01 Jan 2014').getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 150]
          }
        }
        },
        series: [],
      }

      parseHistoryData(data){
        var historyData = []
        var keys = Object.keys(data["bpi"])
        console.log(keys)
        keys.map(date => {
          let d = new Date(date).getTime()
          historyData.push([d, data["bpi"][date]])
        })
        this.setState({
          series: [{
            data: historyData
          }]})
      }
      
      async getBitcoinHistoricalData(url){
        const data = await fetch(url)
        const response = await data.json()
        this.parseHistoryData(response)
      }

      componentDidMount(){
        var d = new Date()
        let date = (d.getDate().toString().length === 1) ? '0' + d.getDate().toString() : d.getDate().toString()
        let year = d.getFullYear()
        let month = (d.getMonth().toString().length === 1) ? '0' + d.getMonth().toString() : d.getMonth().toString()
        let endDate = `${year}-${month}-${date}`
        let startDate = `${year - 6}-${month}-${date}`
        let bitcoinAPIURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
        console.log(bitcoinAPIURL)
        this.getBitcoinHistoricalData(bitcoinAPIURL)
        this.setState({currentDate: endDate})
      }

    updateData (timeline) {
      this.setState({
        selection: timeline
      })
      var minDate = new Date(this.state.currentDate)
      console.log('*********')
      console.log(minDate)
      
      switch (timeline) {
        case 'one_month':
          this.setState({
            options: {
              xaxis: {
                min: minDate.getTime(),
                max: minDate.setMonth(minDate.getMonth() - 1)
              }
            }
          })
          break;
        case 'six_months':
          this.setState({
            options: {
              xaxis: {
                min: minDate.getTime(),
                max: minDate.setMonth(minDate.getMonth() - 6)
              }
            }
          })
          break;
        case 'one_year':
          this.setState({
            options: {
              xaxis: {
                min: minDate.getTime(),
                max: minDate.setMonth(minDate.getMonth() - 12)
              }
            }
          })
          break;
        case 'ytd':
          this.setState({
            options: {
              xaxis: {
                min: minDate.getTime(),
                max: minDate.setMonth(minDate.getMonth() - 60)
              }
            }
          })
          break;
        case 'all':
          this.setState({
            options: {
              xaxis: {
                min: minDate.getTime(),
                max: minDate.setMonth(minDate.getMonth() - 60)
              }
            }
          })
          break;
        default:
      }
    }

    render() {
        console.log(this.state)
      return (
        

        <div id="chart">
          <div className="toolbar">
            <Button onClick={()=>this.updateData('one_month')} id="one_month" className={ (this.state.selection==='one_month' ? 'active' : '')}>1M</Button>
            <Button onClick={()=>this.updateData('six_months')} id="six_months" className={ (this.state.selection==='six_months' ? 'active' : '')}>6M</Button>
            <Button onClick={()=>this.updateData('one_year')} id="one_year" className={ (this.state.selection==='one_year' ? 'active' : '')}>1Y</Button>
            <Button onClick={()=>this.updateData('ytd')} id="ytd" className={ (this.state.selection==='ytd' ? 'active' : '')}>5Y</Button>
            <Button onClick={()=>this.updateData('all')} id="all" className={ (this.state.selection==='all' ? 'active' : '')}>MAX</Button>
          </div>
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="300" />
        </div>
      );
    }
  }

export default AreaChart