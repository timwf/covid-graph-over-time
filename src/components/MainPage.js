import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { fetchData } from '../api/index'
import '../App.css';
import { select, scaleBand, axisBottom, scaleLinear, axisRight } from 'd3';




function MainPage() {

    const svgRef = useRef()
    const [data, setData] = useState([50, 20, 75, 70, 82, 98, 90])
    
    const [allData, setAllData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [ fetchedCountries, setFetchedCountries] = useState([]);

    // useEffect(() => {  
    //     const svg = select(svgRef.current);


    //     const xScale = scaleBand()
    //         .domain(data.map((item, index) => index))
    //         .range([0, 300])
    //         .padding(0.5)

    //     const yScale = scaleLinear()
    //         .domain([0, 100])
    //         .range([150, 0])

    //     const xAxis = axisBottom(xScale).ticks(7)
    //     const yAxis = axisRight(yScale)

    //     svg.select('.y-axis')
    //         .style('transform', 'translateX(300px)')
    //         .call(yAxis)
        
    //     svg.select(".x-axis")
    //         .style('transform', 'translateY(150px)')
    //         .call(xAxis)

    //     svg.selectAll(".bar")
    //         .data(data)
    //         .join("rect")
    //         .attr('class', 'bar')
    //         .attr('x', (value, index) => xScale(index))
    //         .attr('y', yScale)
    //         .attr('height', value => 150 - yScale(value))
    //         .attr('width', xScale.bandwidth())


 
    // }, [data]);

    useEffect( () => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchData()); 
        }
        fetchAPI();
        
    }, [setFetchedCountries])

    if (fetchedCountries.newData){   
        console.log(fetchedCountries.newData["2020-4-25"]);
    }
    
   
    
    
    
 
    
    if (loading) {
        return (<ul>
            {/* {error ? <li>{error.message}</li> : countries.map((country, index) => <li key={index}>{country.name}</li>)} */}
        </ul>);
    } else {
        return (
        
            <React.Fragment>
                {/* <svg ref={svgRef}>
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
                <br/>
                <br/>
                <br/>
                <button onClick={() => setData(data.map(value => value + 5))}>update</button>

                <button onClick={() => setData(data.filter(value => value < 35))}>filter</button> */}
            </React.Fragment>
            
        );
    }
}

export default MainPage;



