import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './Containers/HomeContainer/Home';
import CovidDescription from './Components/DescriptionComponent/DescriptionComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Covid-19 Tracker</h1>
        <CovidDescription />
        <Home/>
      </div>
    </BrowserRouter>
  );
}

export default App;
