//import liraries
import React, { Component } from 'react';
import * as Constants from '../../Utilities/Constants';
import styles from './Covidstatus.module.css';

import CardComponent from '../../Components/CardComponent/CardComponent';

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Pie2d from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


// create a component
class Covidstatus extends Component {
    state = {
        globalStatus: [{
            label: Constants.StatusConfirmed,
            value: 0
        },
        {
            label: Constants.StatusRecovered,
            value: 0
        },
        {
            label: Constants.StatusDeath,
            value: 0
        }],
        globalStatusLoaded: false
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(Constants.CovidApiURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    globalStatus: [{
                        label: Constants.StatusConfirmed,
                        value: result.confirmed.value
                    },
                    {
                        label: Constants.StatusRecovered,
                        value: result.recovered.value
                    },
                    {
                        label: Constants.StatusDeath,
                        value: result.deaths.value
                    }],
                    globalStatusLoaded: true
                })
            })
            .catch(error => console.log('error', error));

    }

    render() {
        ReactFC.fcRoot(FusionCharts, Pie2d, FusionTheme);
        let chartConfigs = {
            type: "Pie2d", // The chart type
            width: "100%", // Width of the chart
            height: "300", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
                // Chart Configuration
                chart: {
                    //Set the chart caption
                    caption: "Global Covid-19 Status",
                    //Set the chart subcaption
                    subCaption: "",
                    //Set the x-axis name
                    xAxisName: "Status",
                    //Set the y-axis name
                    yAxisName: "Count",
                    numberSuffix: "",
                    //Set the theme for your chart
                    theme: "candy"
                },
                // Chart Data
                data:  this.state.globalStatus
            }
        };

        return (
            <div className={styles.CovidBody}>
            
                <h3 className={styles.SelectedCountry}>Global Case</h3>
                {
                    (this.state.globalStatusLoaded) ?
                        <div><CardComponent
                            data={this.state.globalStatus} /><ReactFC  className={styles.CountryChart} {...chartConfigs} /></div> : null
                    /*(this.state.globalStatusLoaded) ?
                        <ReactFC {...chartConfigs} /> : null*/
                }

            </div>
        );
    }
}

//make this component available to the app
export default Covidstatus;
