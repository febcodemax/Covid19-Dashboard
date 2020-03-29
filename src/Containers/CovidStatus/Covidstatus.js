//import liraries
import React, { Component } from 'react';
import * as Constants from '../../Utilities/Constants';
import styles from './Covidstatus.module.css';

import CardComponent from '../../Components/CardComponent/CardComponent';
import CountryWiseComponent from '../CountryWise/CountryWise';

// create a component
class Covidstatus extends Component {
    state = {
        globalStatus: [{
            Title: Constants.StatusConfirmed,
            Status: 0
        },
        {
            Title: Constants.StatusRecovered,
            Status: 0
        },
        {
            Title: Constants.StatusDeath,
            Status: 0
        }],
        globalStatusLoaded: false
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://covid19.mathdro.id/api", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    globalStatus: [{
                        Title: Constants.StatusConfirmed,
                        Status: result.confirmed.value
                    },
                    {
                        Title: Constants.StatusRecovered,
                        Status: result.recovered.value
                    },
                    {
                        Title: Constants.StatusDeath,
                        Status: result.deaths.value
                    }],
                    globalStatusLoaded: true
                })
            })
            .catch(error => console.log('error', error));

    }

    render() {
        return (
            <div className={styles.CovidBody}>
                 <h3 className={styles.SelectedCountry}>Global Case</h3>
            {
                (this.state.globalStatusLoaded) ? 
                <CardComponent 
                    data={this.state.globalStatus} /> : null
            }
            <CountryWiseComponent defaultCountry="India"/>
            </div>
        );
    }
}

//make this component available to the app
export default Covidstatus;
