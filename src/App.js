import React, { useEffect, useState } from 'react';
import { fetchData } from './api/index'
import logo from './logo.svg';
import './App.css';

import MainGraph from './components/MainGraph'

function App() {

  const [ fetchedCountries, setFetchedCountries] = useState([]);

  useEffect( () => {
    const fetchAPI = async () => {
        setFetchedCountries(await fetchData()); 
    }
    fetchAPI();
    
}, [setFetchedCountries])

if (fetchedCountries.newData){   
    console.log(fetchedCountries.newData["2020-4-25"]);
}



  return (
    <div className="App">
      < MainGraph data={fetchedCountries}> </MainGraph>
    </div>
  );
}

export default App;
