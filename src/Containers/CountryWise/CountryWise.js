//import liraries
import React, { Component } from 'react';
import * as Constants from '../../Utilities/Constants';
import CardComponent from '../../Components/CardComponent/CardComponent';
import styles from './CountryWise.module.css';

import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// create a component
class CountryWise extends Component {
    state = {
        defaultCountry: this.props.match.params.id,
        covidCountries: [],
        covidCountriesLoaded: false,
        covidCountryWiseStatusLoaded: false,
        covidCountryWiseStatus: [{
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
        confirmedDataForChart: [],
        recoveredDataForChart: [],
        deathsDataForChart: []
    }

    componentDidMount() {
        debugger;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(Constants.CovidApiCountryURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    covidCountries: result.countries,
                    covidCountriesLoaded: true
                });

                this.countryDataLoad(this.state.defaultCountry);
                this.fetchCountrySpecificChartData(this.state.defaultCountry);
            })
            .catch(error => console.log('error', error));
    }

    fetchCountrySpecificChartData(countryName) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(Constants.chartDataApi, requestOptions)
            .then(response => response.json())
            .then(data => {
                // Work with JSON data here

                var countrywiseDataForChart = data.dailyReports.map(function (e) {
                    return {
                        updatedDate: e.updatedDate,
                        countries: e.countries.filter(rep => rep.countryCode === countryName),
                        monthName: monthNames[new Date(e.updatedDate).getMonth()],
                    };
                });
                var confirmedArray = countrywiseDataForChart.map(function (e) {
                    return {
                        label: e.monthName,
                        value: (e.countries.length === 1) ? e.countries[0].confirmed : 0
                    };
                });

                var recoveredArray = countrywiseDataForChart.map(function (e) {
                    return {
                        label: e.monthName,
                        value: (e.countries.length === 1) ? e.countries[0].recovered : 0
                    };
                });
                var deathArray = countrywiseDataForChart.map(function (e) {
                    return {
                        label: e.monthName,
                        value: (e.countries.length === 1) ? e.countries[0].deaths : 0
                    };
                });

                this.setState({
                    confirmedDataForChart: this.GetValueSum(confirmedArray),
                    recoveredDataForChart: this.GetValueSum(recoveredArray),
                    deathsDataForChart: this.GetValueSum(deathArray)
                });
            }).catch(error => console.log('error', error));
    }

    countryDataLoad(countryName) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        var reqeustURL = Constants.CovidApiCountryURL + countryName;

        fetch(reqeustURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    defaultCountry: countryName,
                    covidCountryWiseStatus: [{
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
                    covidCountryWiseStatusLoaded: true
                });
            })
            .catch(error => console.log('error', error));
    }

    countryClickHandler = (event) => {
        const countryName = event.target.value;

        this.countryDataLoad(countryName);
        this.fetchCountrySpecificChartData(countryName);
    }

    GetValueSum(arr) {
        var newArray = [];
        var currentMonth = monthNames[new Date().getMonth()];
        monthNames.forEach(month => {
            var modifiedArr = arr.filter(res => res.label === month);
            if (modifiedArr.length > 0) {
                var sum = 0;
                if (month === currentMonth) {
                    sum = modifiedArr[modifiedArr.length - 2].value;
                } else {
                    sum = modifiedArr[modifiedArr.length - 1].value;
                }
                /*var sum = modifiedArr.reduce(function (total, currentValue) {
                    return total + currentValue.value;
                }, 0);*/
                newArray.push({ label: month, value: sum });
            }
        });
        return newArray
    }

    render() {
        let countryOptions = null;
        if (this.state.covidCountriesLoaded) {
            countryOptions = this.state.covidCountries.map((country, i) => {
                if (country.iso2 !== undefined && country.name !== undefined) {
                    return (
                        <option key={i} value={country.iso2}>{country.name}</option>
                    );
                } else {
                    return null;
                }
            })
        }

        const confirmedDS = {
            chart: {
                caption: "Covid-19 Confirmed Count",
                yaxisname: "Confirmed Count",
                subcaption: "",
                numbersuffix: "",
                rotatelabels: "1",
                setadaptiveymin: "1",
                theme: "candy"
            },
            data: this.state.confirmedDataForChart
        };

        const recoveredDS = {
            chart: {
                caption: "Covid-19 Recovered Count",
                yaxisname: "Recovered Count",
                subcaption: "",
                numbersuffix: "",
                rotatelabels: "1",
                setadaptiveymin: "1",
                theme: "candy"
            },
            data: this.state.recoveredDataForChart
        };

        const deathDS = {
            chart: {
                caption: "Covid-19 Death Count",
                yaxisname: "Death Count",
                subcaption: "",
                numbersuffix: "",
                rotatelabels: "1",
                setadaptiveymin: "1",
                theme: "candy"
            },
            data: this.state.deathsDataForChart
        };

        return (
            <div>
                <div className={styles.Country}>
                    <select className={styles.SelectBox} onChange={this.countryClickHandler} value={this.state.defaultCountry}>
                        {countryOptions}
                    </select>
                    <div>
                        {
                            (this.state.covidCountryWiseStatusLoaded) ? <CardComponent data={this.state.covidCountryWiseStatus} /> : null
                        }
                    </div>
                </div>
                <div className={styles.Country}>
                    <ReactFusioncharts
                        type="spline"
                        width="100%"
                        className={styles.CountryChart}
                        height="100%"
                        dataFormat="JSON"
                        dataSource={confirmedDS}
                    />
                    <ReactFusioncharts
                        type="spline"
                        width="100%"
                        className={styles.CountryChart}
                        height="100%"
                        dataFormat="JSON"
                        dataSource={recoveredDS}
                    />
                    <ReactFusioncharts
                        type="spline"
                        width="100%"
                        className={styles.CountryChart}
                        height="100%"
                        dataFormat="JSON"
                        dataSource={deathDS}
                    />
                </div>
            </div>
        )
    }
}

//make this component available to the app
export default CountryWise;