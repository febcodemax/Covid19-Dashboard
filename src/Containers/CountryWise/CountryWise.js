//import liraries
import React, { Component } from 'react';
import * as Constants from '../../Utilities/Constants';
import CardComponent from '../../Components/CardComponent/CardComponent';
import styles from './CountryWise.module.css';

// create a component
class CountryWise extends Component {
    state = {
        defaultCountry: this.props.defaultCountry,
        covidCountries: [],
        covidCountriesLoaded: false,
        covidCountryWiseStatusLoaded: false,
        covidCountryWiseStatus: [{
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
        }]
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://covid19.mathdro.id/api/countries", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    covidCountries: result.countries,
                    covidCountriesLoaded: true
                });

                this.countryDataLoad(this.state.defaultCountry);
            })
            .catch(error => console.log('error', error));
    }

    countryDataLoad(countryName) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        var reqeustURL = "https://covid19.mathdro.id/api/countries/" + countryName;

        fetch(reqeustURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    defaultCountry: countryName,
                    covidCountryWiseStatus: [{
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
                    covidCountryWiseStatusLoaded: true
                });
            })
            .catch(error => console.log('error', error));
    }

    countryClickHandler = (event) => {
        const countryName = event.target.value;
        this.countryDataLoad(countryName);
    }

    render() {
        let countryOptions = null;
        if (this.state.covidCountriesLoaded) {
            countryOptions = this.state.covidCountries.map((country, i) => {
                if (country.iso2 !== undefined && country.name !== undefined) {
                    return (
                        <option key={i} value={country.name}>{country.name}</option>
                    );
                } else {
                    return null;
                }
            })
        }

        return (
            <div className={styles.Country}>
                <select className={styles.SelectBox} onChange={this.countryClickHandler} value={this.state.defaultCountry}>
                    {countryOptions}
                </select>
                <div>
                    <h3 className={styles.SelectedCountry}>Country : {this.state.defaultCountry}</h3>

                    {
                        (this.state.covidCountryWiseStatusLoaded) ? <CardComponent data={this.state.covidCountryWiseStatus} /> : null
                    }
                </div>
            </div>
        )
    }
}

//make this component available to the app
export default CountryWise;