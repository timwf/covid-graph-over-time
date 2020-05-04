import React, { useEffect, useState } from 'react';
import { fetchData } from './api/index'
import './App.css';
import MainGraph from './components/MainGraph'
import Loader from 'react-loader-spinner'

function App() {
const [ fetchedCountries, setFetchedCountries] = useState([]);
const [loading, setLoading] = useState(true)

//gets data from api
useEffect( () => {
    const fetchAPI = async () => {
        setFetchedCountries(await fetchData()); 
        setLoading(false)
    }
    fetchAPI();   
    setLoading(true) 
}, [setFetchedCountries])

  if (loading){
    return(
      <Loader
      className="loading"
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}

   />
    )
  } else 
  return (
    <div className="App">
      < MainGraph data={fetchedCountries}> </MainGraph>
    </div>
  );
}

export default App;
