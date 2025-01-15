export const apiKey = "5e10f3f4daa84fa28de123631241012";

const getCurrentTime = () => {
  return new Date().getHours();
};

const time = getCurrentTime();

const dayWeatherImages = {
  "Partly cloudy": require("../assets/images/partlycloudy.png"),
  "Moderate rain": require("../assets/images/moderaterain.png"),
  "Heavy rain": require("../assets/images/heavyrain.png"),
  Clear: require("../assets/images/sun.png"),
  Sunny: require("../assets/images/sun.png"),
  Overcast: require("../assets/images/cloud.png"),
  "Patchy rain possible": require("../assets/images/moderaterain.png"),
  "Patchy rain nearby": require("../assets/images/moderaterain.png"),
  Cloudy: require("../assets/images/cloud.png"),
  Fog: require("../assets/images/fog.png"),
  "Light rain": require("../assets/images/moderaterain.png"),
  "Light drizzle": require("../assets/images/moderaterain.png"),
  "Moderate rain at times": require("../assets/images/moderaterain.png"),
  "Heavy rain at times": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain shower": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/images/heavyrain.png"),
  "Moderate or heavy freezing rain": require("../assets/images/heavyrain.png"),
  Mist: require("../assets/images/mist.png"),
  other: require("../assets/images/moderaterain.png"),
};

const nightWeatherImages = {
  "Partly cloudy": require("../assets/images/partlycloudy.png"),
  "Moderate rain": require("../assets/images/moderaterain.png"),
  "Heavy rain": require("../assets/images/heavyrain.png"),
  Clear: require("../assets/images/sun.png"),
  Sunny: require("../assets/images/sun.png"),
  Overcast: require("../assets/images/cloud.png"),
  "Patchy rain possible": require("../assets/images/moderaterain.png"),
  "Patchy rain nearby": require("../assets/images/moderaterain.png"),
  Cloudy: require("../assets/images/cloud.png"),
  Fog: require("../assets/images/fog.png"),
  "Light rain": require("../assets/images/moderaterain.png"),
  "Light drizzle": require("../assets/images/partlycloudy.png"),
  "Moderate rain at times": require("../assets/images/moderaterain.png"),
  "Heavy rain at times": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain shower": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/images/heavyrain.png"),
  "Moderate or heavy freezing rain": require("../assets/images/heavyrain.png"),
  Mist: require("../assets/images/mist.png"),
  other: require("../assets/images/moderaterain.png"),
};

export const weatherImages =
  time >= 6 && time <= 18 ? dayWeatherImages : nightWeatherImages;
