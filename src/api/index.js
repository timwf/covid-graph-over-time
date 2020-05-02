import axios from 'axios'

const url = 'https://pomber.github.io/covid19/timeseries.json';
const topNumber = 20;

export const fetchData = async() => {
    let dummyDate = [];
    let newData = {}    
    try {
        const res = await axios.get(url);
        const data = res.data

        
        //data come in sorted by country {country: [date, deaths, confirmed, recovered]}
        //this sorts by date {date: [country, deaths, confirmed, recovered]}
        for (let [key, value] of Object.entries(data)) {           
            for (let [keyt, valuet] of Object.entries(value)) {                  
                    if (dummyDate.indexOf(valuet.date) === -1){
                        dummyDate.push(valuet.date);                            
                        newData[valuet.date] = [{country: key, deaths: value.deaths}]                         
                    }               
                    if (newData.hasOwnProperty(valuet.date)) {
                        newData[valuet.date].push({
                            country: key, 
                            deaths: value[keyt].deaths, 
                            confirmed: value[keyt].confirmed, 
                            recovered: value[keyt].recovered})                        
                    }                              
                }            
          }       

          findTopNumber(topNumber, newData)
        return { newData }
    }   catch (error) {
        console.log(error);
    }
}




function findTopNumber(topNumber, data){
    // let sortable = Object.entries(data)  
    // console.log(sortable);
    // let countryLength = sortable[1][1].length
    // console.log(countryLength);
    
    

    
    
    
    // for (let index = 0; index < sortable.length; index++) {  

    //     for (let indext = 0; indext < sortable[1][1].length; indext++) {          
    //         console.log(sortable[indext]);
            
    //          console.log(sortable[index][1][index]);  
    //     if (true){

    //     }
    // }
     
    // } 
    
    


}



