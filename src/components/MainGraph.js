import React, { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import CountryDropdown from './CountryDropdown'
import play from '../images/play.png'
import Header from './Header'


let keyCount = 0
let lastUpdate = ""
let defaultCountries = []

function MainGraph(props) {
    const [upDate, setUpDate] = useState('')
    const [countryArray, setCountryArray] = useState([])
    const [updateArr, setUpdateArr] = useState(false)
    const [countrySelected, setCountrySelected] = useState([])
    const [disableButton, setDisableButton] = useState(false)
    
    
    const countriesSelectedArray = []
    const dateArr = []

    //sets current selected countries from CountyTick
    if(props.data.newData){
        if (props.data.newData[upDate]){
            let arr = props.data.newData[upDate]  
            defaultCountries = []        
            defaultCountries.push(arr[29], arr[57], arr[17], arr[33], arr[125], arr[155], arr[78], arr[72], arr[157], arr[9])
        }
        console.log(defaultCountries);
        
        
        
        for (let countries in props.data.newData[upDate]){
            // console.log(props.data.newData[upDate][29]);
            
            if(countrySelected){
                for (let index = 0; index < countrySelected.length; index++) {
                    if (props.data.newData[upDate][countries].country == countrySelected[index].country){
                        countriesSelectedArray.push(props.data.newData[upDate][countries])                                
                    }                
                }

            }

        }
    }

    //gets array of dates
    if(props.data.newData){
        for (let [key, value] of Object.entries(props.data.newData)) { 
            dateArr.push(key)            
        }     
    }

    // sets array for available countries in CountryTick
    if (props.data.newData  && !updateArr){   
        setUpDate(Object.keys(props.data.newData)[Object.keys(props.data.newData).length - 1]);
        lastUpdate = Object.keys(props.data.newData)[Object.keys(props.data.newData).length - 1]      
        
        let arr =  props.data.newData[Object.keys(props.data.newData)[Object.keys(props.data.newData).length - 1]]

        

        let list = []
        arr.forEach(element => {
            list.push({
                label: `${element.country}, cases: ${element.confirmed}`, 
                value: element.confirmed, 
                country: element.country})        
        })
        setCountryArray(list)       
        setUpdateArr(true)    
    }
    
    //plays dates
    function playTime(){       
        setTimeout(function() {            
            setUpDate(dateArr[keyCount])
            keyCount++; 
            console.log(keyCount);            
            if (keyCount < dateArr.length) {
                setDisableButton(true)
              playTime(); 
            }      
            if (keyCount > dateArr.length){               
                keyCount = 0
                console.log('else ' + keyCount);
                playTime()
                setUpDate(dateArr[keyCount])  
            } 
            if(keyCount == dateArr.length){
                setDisableButton(false)
            }           
          }, 80)          
    }
    
    console.log(countriesSelectedArray);
    let data = defaultCountries
    if (countrySelected){
        if(countrySelected.length > 0){
            data = countriesSelectedArray
        }
        else data = defaultCountries         
    }
   
    return(
    <React.Fragment>
        <Header />
        <CountryDropdown list={countryArray} addCountry={setCountrySelected}></CountryDropdown>
        <button onClick={() => playTime()} disabled={disableButton} className="play-btn"><img src={play} height="46px "/></button>
    <p className="date-header">{upDate}</p><span></span>
    <div className="graph-wrapper">
    <ResponsiveBar
        data={ data}
        keys={[ 'confirmed', 'deaths', 'recovered' ]}
        indexBy="country"
        margin={{ top: 50, right: 120, bottom: 150, left: 80 }}
        padding={0.1}
        colors={{ scheme: 'nivo' }}

        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,     
            legendPosition: 'middle',
            legendOffset: 92
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -68
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 10,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={150}
        motionDamping={15}
    />
    </div>
    <p className="twf-tag">last updated {lastUpdate} (api: https://pomber.github.io/covid19/timeseries.json) </p>
    </React.Fragment>
)

}  

export default MainGraph