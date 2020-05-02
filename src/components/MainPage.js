import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { fetchData } from '../api/index'



function MainPage() {

    const [allData, setAllData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [ fetchedCountries, setFetchedCountries] = useState([]);

    useEffect( () => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchData()); 
        }
        fetchAPI();
    }, [setFetchedCountries])
    console.log(fetchedCountries);
    
 
    
    if (loading) {
        return (<ul>
            {/* {error ? <li>{error.message}</li> : countries.map((country, index) => <li key={index}>{country.name}</li>)} */}
        </ul>);
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }
}

export default MainPage;



