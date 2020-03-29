import React from 'react';
import './App.css';

import Covidstatus from './Containers/CovidStatus/Covidstatus';
import CovidDescription from './Components/DescriptionComponent/DescriptionComponent';

function App() {
  return (
    <div className="App">
      <h1>Covid-19 Tracker</h1>
      <CovidDescription />
      <Covidstatus/>
    </div>
  );
}

export default App;
