

export function countryAry(data){
    console.log(data);
    let arr =  data[Object.keys(data)[Object.keys(data).length - 1]]
    let list = []
    arr.forEach(element => {
        list.push({country: element.country, count: element.confirmed})        
    });
    return list
    
    

}