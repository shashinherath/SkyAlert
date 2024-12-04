import React, { useState } from "react";
import { View, Text, StatusBar, Image, TextInput, TouchableOpacity } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";
import {MagnifyingGlassIcon} from "react-native-heroicons/outline" ;
import {MapPinIcon} from "react-native-heroicons/solid" ;



export default function Index() {
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]);
  const handleLocation = (loc) =>{
    console.log('location',loc);
  }
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/Background.jpg")}
        className="absolute w-full h-full"
      />
      <SafeAreaView className="flex flex-1">
        <View className="mx-4 relative z-50" style={{ height: "7%" }}>
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{ backgroundColor: showSearch? theme.bgWhite(0.2): 'transparent' }}
          >
            {
              showSearch? (
                <TextInput
                placeholder="Search city"
                placeholderTextColor={"lightgray"}
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
              ):null
            }
           
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style = {{backgroundColor: theme.bgWhite(0.3)}}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" /> 
              </TouchableOpacity>
          </View>
          {
            location.length>0 && showSearch? (
              <View className="absolute w-full bg-gray-300 top-16 rounded—3xl">
                {
                  location.map((loc, index) =>{
                    let showBorder = index+1 != location.length;
                    let borderClass = showBorder? "border-b-2 border-b-gray-400": "";
                    return (
                    <TouchableOpacity 
                      onPress={() => handleLocation(loc)}
                      key={index} 
                      className= {"flex-row items-center border-0 p-3 px-4 mb-1 "+borderClass}>
                      <MapPinIcon size={20} color="gray" />
                      <Text className="text-black text-lg ml-2">Colombo, Sri Lanka</Text>
                    </TouchableOpacity>
                  )
                })
          }
        </View>
            ):null
          }
          </View>
          {/* forecast section */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            {/* location */}
            <Text className="text-white text-center text-2xl font-bold">Colombo,
            <Text className="text-lg font-semibold text-gray-300">Sri Lanka
              </Text>
            </Text>
          {/* weather image */}
          <view className="flex-row justify-center">
            <Image
              source={require("../assets/images/Weather.png")}
              className="w-52 h-52"
            />
          </view>
          {/* degree clecius */}
          <View className="apace-y-2">
            <Text className="text-white text-center font-bold text-6xl ml-5">23&#176;
            </Text>
            <Text className="text-white text-center text-xl tracking-widest"> Partly Cloudy
            </Text>
            </View>
            {/* other status */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <image source={require("../assets/images/wind.png")} className="w-6 h-6" />
                <Text className="text-white font-semibold text-base">13km
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <image source={require("../assets/images/drop.png")} className="w-6 h-6" />
                <Text className="text-white font-semibold text-base">25%
                </Text>
              </View>
  
              <View className="flex-row space-x-2 items-center">
                <image source={require("../assets/images/sun.png")} className="w-6 h-6" />
                <Text className="text-white font-semibold text-base"> 6:30 AM 
                </Text>
              </View>
              </View>
          </View>
          
          {/* forecast for next days */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <CalanderDaysIcon size="22" color="white" />
              <Text className="text-white text-base"> Daily forecast</Text>
            </View>
            <Scrollview
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              <View
                className="flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={require("../assets/images/heavyrain.png")} 
                className="w-11 h-11" />
                <Text className="text-white">Monday</Text>
                <Text className="text-white taxt-xl font-semibold">
                  13&#176;
                  </Text>
                  </View>
                  <View
                className="flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={require("../assets/images/heavyrain.png")} 
                className="w-11 h-11" />
                <Text className="text-white">Tuesday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                  </Text>
                  </View>
                  <View
                className="flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={require("../assets/images/heavyrain.png")} 
                className="w-11 h-11" />
                <Text className="text-white">Wednesday</Text>
                <Text className="text-white taxt-xl font-semibold">
                  13&#176;
                  </Text>
                  </View>
                  <View
                className="flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={require("../assets/images/heavyrain.png")} 
                className="w-11 h-11" />
                <Text className="text-white">Thursday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                  </Text>
                  </View>
                  <View
                className="flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={require("../assets/images/heavyrain.png")} 
                className="w-11 h-11" />
                <Text className="text-white">Friday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                  </Text>
                  </View>
                  <View
                className="flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={require("../assets/images/heavyrain.png")} 
                className="w-11 h-11" />
                <Text className="text-white">Saturday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                  </Text>
                  </View>
                  <View
                className="flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={require("../assets/images/heavyrain.png")} 
                className="w-11 h-11" />
                <Text className="text-white">Sunday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                  </Text>
                  </View>
                  </Scrollview>
          </View>


      </SafeAreaView>
    </View>
  );
}
