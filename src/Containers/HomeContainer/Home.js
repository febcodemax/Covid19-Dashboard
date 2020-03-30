//import liraries
import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import styles from './Home.module.css'

import CountryWiseComponent from '../CountryWise/CountryWise';
import Covidstatus from '../CovidStatus/Covidstatus';

// create a component
class Home extends Component {
    render() {
        return (
            <div className={styles.Home}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/Covid-19-Dashboard"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: "#fa923f",
                                    textDecoration: "underline"
                                }}
                            >Global Case</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/country/IN"
                            }}>Case By Country</NavLink></li>
                        </ul>
                    </nav>
                </header>-
                <Switch>
                    <Route path="/country/:id" component={CountryWiseComponent} />
                    <Route path="/Covid-19-Dashboard" component={Covidstatus} />
                </Switch>

            </div>);
    }
}

//make this component available to the app
export default Home;
