import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import {debounce} from 'lodash';
import {fetchLocations, fetchWeatherForcast} from '../api/weather'
import {weatherImages} from '../constants';
import * as Progress from 'react-native-progress';
import {getData, storeData} from '../utils/asyncStorage';


export default function Index() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather,setWeather]=useState({})
  const [loading, setLoading] = useState(true);
  

  const handleLocation = (loc) => {
    // console.log("location", loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForcast({
      cityName:loc.name,
      days:'7'
    }).then(data=>{
      setWeather(data);
      setLoading(false);
      storeData('city',loc.name);
    //  console.log("got focast",data);
    })
  };


  const handleSearch = value =>{
    console.log('value: ',value)

    if(value.length>2){
      
      fetchLocations({cityName:value}).then(data=>{
        setLocations(data);
        console.log("got locations",data);
      })

    }
   
  }
  
  useEffect(() => {
    fetchMyWeatherData();
  }, []);
  
  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Colombo';
    if (myCity) cityName = myCity;
    
    fetchWeatherForcast({
      cityName,
      days:'7'
    }).then(data=>{
      setWeather(data);
      setLoading(false)
    })
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [handleSearch]);
 
  const {current, location}=weather;


  return (
    <View className="relative flex-1">
      <StatusBar barStyle="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/Background.jpg")}
        className="absolute w-full h-full"
      />
      {
        loading ? (
          <View className="flex items-center justify-center flex-1-row">
            <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
          </View>
        ):(

      
          <SafeAreaView className="flex flex-1">
        <View className="relative z-50 mx-4" style={{ height: "7%" }}>
          <View
            className="flex-row items-center justify-end rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
              onChangeText={handleTextDebounce}
                placeholder="Search city"
                placeholderTextColor={"lightgray"}
                className="flex-1 h-10 pb-1 pl-6 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="p-3 m-1 rounded-full"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1 " +
                      borderClass
                    }
                  >
                    <MapPinIcon size={20} color="gray" />
                    <Text className="ml-2 text-lg text-black">{loc.name},{loc.country}, 
                    {loc.region}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* forecast section */}
        <View className="flex justify-around flex-1 mx-4 mb-2">
          {/* location */}
          <Text className="text-2xl font-bold text-center text-white">
            {location?.name},
            <Text className="text-lg font-semibold text-gray-300">
              {" "+location?.country}
            </Text>
          </Text>
          {/* weather image */}
          <View className="flex-row justify-center">
              <Image 
                source={{uri: `https:${current?.condition?.icon}`}}
              // source={weatherImages[current?.condition?.text]}    i removed this line because it shows the same image for lot of weather conditions
              className="w-52 h-52"
            />
          </View>
          {/* degree Celsius */}
          <View className="space-y-2">
            <Text className="ml-5 text-6xl font-bold text-center text-white">
              {current?.temp_c}&#176;
            </Text>
            <Text className="text-xl tracking-widest text-center text-white">
              {current?.condition?.text}
            </Text>
          </View>
          {/* other status */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../assets/images/wind.png")}
                className="w-6 h-6"
              />
              <Text className="text-base font-semibold text-white">{" "+current?.wind_kph}km</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../assets/images/drop.png")}
                className="w-6 h-6"
              />
              <Text className="text-base font-semibold text-white">{" "+current?.humidity}%</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../assets/images/sun.png")}
                className="w-6 h-6"
              />
              <Text className="text-base font-semibold text-white">
              {" "+current?.uv} uv
              </Text>
            </View>
          </View>
        </View>
        

  {/* forecast for next days */}
<View className="mb-2 space-y-3">
  {/* Header Section */}
  <View className="flex-row items-center mx-5 space-x-2">
    <CalendarDaysIcon size="22" color="white" />
    <Text className="text-base text-white">Daily Forecast</Text>
  </View>

  {/* ScrollView for Daily Forecast */}
  <ScrollView
    horizontal
    contentContainerStyle={{ paddingHorizontal: 15 }}
    showsHorizontalScrollIndicator={false}
  >
    {weather?.forecast?.forecastday?.map((item, i) => {
      // Extract details for each day
      const dayName = new Date(item.date)
        .toLocaleDateString("en-US", { weekday: "long" })
        .split(",")[0]; // Convert date to weekday name
      const avgTemp = item.day.avgtemp_c; // Average temperature
      const conditionText = item.day.condition.text; // Condition description
      const weatherImage = { uri: `https:${item.day.condition.icon}` }; // Weather condition icon

      return (
        <View
          key={i}
          className="flex items-center justify-center w-24 py-3 mr-4 space-y-1 rounded-3xl"
          style={{ backgroundColor: theme.bgWhite(0.15) }}
        >
          {/* Weather Icon */}
          <Image source={weatherImage} className="w-11 h-11" />
          {/* Day Name */}
          <Text className="text-white">{dayName}</Text>
          {/* Average Temperature */}
          <Text className="text-xl font-semibold text-white">
            {avgTemp}&#176;
          </Text>
        </View>
      );
    })}
  </ScrollView>
</View>


      </SafeAreaView>
          
          
        )
      }
      
    </View>
  );
}
