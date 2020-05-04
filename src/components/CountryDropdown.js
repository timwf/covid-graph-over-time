import React, {useState, useEffect} from 'react'
import Select from 'react-select'

export default function CountryDropdown(props) {


    if (props.list){
        return (
            <Select
            isMulti
            name="colors"
            options={props.list} 
            onChange={props.addCountry}           
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select a Country...."
        
          />            
        );
    }
    else return <p>loading</p>

    


}
