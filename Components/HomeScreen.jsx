import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForcast } from "../api/weather";
import * as Progress from "react-native-progress";
import { getData, storeData } from "../utils/asyncStorage";
import theme from "../theme/theme";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForcast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Colombo";
    if (myCity) cityName = myCity;

    fetchWeatherForcast({
      cityName,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [
    handleSearch,
  ]);

  const { current, location, forecast } = weather;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="relative flex-1 bg-gray-900">
          <StatusBar barStyle="light" className="bg-gray-900" />
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
            </View>
          ) : (
            <SafeAreaView className="flex-1">
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
              >
                {/* Title Section */}
                <View className="items-center mt-4">
                  <Text className="text-3xl font-bold text-white">
                    SkyAlert
                  </Text>
                </View>
                {/* Search Section */}
                <View
                  className="relative z-50 mx-4"
                  style={{ marginTop: Platform.OS === "ios" ? 0 : 10 }}
                >
                  <View
                    className="flex-row items-center justify-end rounded-full"
                    style={{
                      backgroundColor: showSearch
                        ? theme.bgWhite(0.2)
                        : "transparent",
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
                  {/* Search Results */}
                  {locations.length > 0 && showSearch ? (
                    <View
                      className="absolute w-full bg-gray-300 top-16 rounded-3xl"
                      style={{ maxHeight: "60%" }}
                    >
                      <ScrollView keyboardShouldPersistTaps="always">
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
                              <Text className="ml-2 text-lg text-black">
                                {loc?.name}, {loc?.country}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </View>
                  ) : null}
                </View>

                {/* Weather Content */}
                <View className="flex justify-around flex-1 mx-4 mb-2">
                  {/* Location Info */}
                  <Text className="text-2xl font-bold text-center text-white">
                    {location?.name},
                    <Text className="text-lg font-semibold text-gray-300">
                      {" " + location?.country}
                    </Text>
                  </Text>
                  {/* Weather Image */}
                  <View className="flex-row justify-center">
                    <Image
                      source={{ uri: `https:${current?.condition?.icon}` }}
                      className="w-52 h-52"
                    />
                  </View>
                  {/* Temperature and Condition */}
                  <View className="space-y-2">
                    <Text className="ml-5 text-6xl font-bold text-center text-white">
                      {current?.temp_c}&#176;
                    </Text>
                    <Text className="text-xl tracking-widest text-center text-white">
                      {current?.condition?.text}
                    </Text>
                  </View>
                  {/* Weather Stats */}
                  <View className="flex-row justify-between mx-4">
                    <View className="flex-row items-center space-x-2">
                      <Image
                        source={require("../assets/images/wind.png")}
                        className="w-6 h-6"
                      />
                      <Text className="text-base font-semibold text-white">
                        {" " + current?.wind_kph}km
                      </Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                      <Image
                        source={require("../assets/images/drop.png")}
                        className="w-6 h-6"
                      />
                      <Text className="text-base font-semibold text-white">
                        {" " + current?.humidity}%
                      </Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                      <Image
                        source={require("../assets/images/sun.png")}
                        className="w-6 h-6"
                      />
                      <Text className="text-base font-semibold text-white">
                        {" " + current?.uv} uv
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Daily Forecast */}
                <View className="mb-2 space-y-3">
                  <View className="flex-row items-center mx-5 space-x-2">
                    <CalendarDaysIcon size="22" color="white" />
                    <Text className="text-base text-white">Daily Forecast</Text>
                  </View>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    showsHorizontalScrollIndicator={false}
                  >
                    {forecast?.forecastday?.map((item, i) => {
                      const dayName = new Date(item.date)
                        .toLocaleDateString("en-US", { weekday: "long" })
                        .split(",")[0];
                      const avgTemp = item.day.avgtemp_c;
                      const weatherImage = {
                        uri: `https:${item.day.condition.icon}`,
                      };

                      return (
                        <View
                          key={i}
                          className="flex items-center justify-center w-24 py-3 mr-4 space-y-1 rounded-3xl"
                          style={{ backgroundColor: theme.bgWhite(0.15) }}
                        >
                          <Image source={weatherImage} className="w-11 h-11" />
                          <Text className="text-white">{dayName}</Text>
                          <Text className="text-xl font-semibold text-white">
                            {avgTemp}&#176;
                          </Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
