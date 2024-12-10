import axios from 'axios'

 const apiKey='5e10f3f4daa84fa28de123631241012'; 

 const forecastEndPoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no `
 const locationEndPoint= params=>`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`

 const apiCall = async (endpoint)=>{
    const option ={
        method:'GET',
        url:endpoint
    }
    try{
        const response = await axios.request(option);
        return response.data;

    }catch(err){
        console.log('error:',err);
        return null;
    }
 }

 export const fetchWeatherForcast = params =>{
    return apiCall(forecastEndPoint(params));
     
 }

 export const fetchLocations = params => {
    console.log("Fetching locations for:", params.cityName);
    return apiCall(locationEndPoint(params));
};

const weatherAPI = {
    fetchWeatherForcast,
    fetchLocations,
};

export default weatherAPI;