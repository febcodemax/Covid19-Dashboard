//import liraries
import React from 'react';
import * as Constants from '../../Utilities/Constants';
import Aux from '../../hoc/Auxilary/Auxilary';
// create a component
const covidDescription = (props) => (
    <Aux>
        <span>{Constants.CovidDescriptionPart1}</span>
        <br />
        <span>{Constants.CovidDescriptionPart2}</span>
        <h3>{Constants.CovidSpreadTitle}</h3>
        <span>{Constants.CovidSpreadDescription}</span>
    </Aux>
)

//make this component available to the app
export default covidDescription;
