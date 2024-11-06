import { View, Text, StatusBar, Image, TextInput } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";

export default function index() {
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
            style={{ backgroundColor: theme.bgWhite(0.2) }}
          >
            <TextInput
              placeholder="Search city"
              placeholderTextColor={"lightgray"}
              className="pl-6 h-10 flex-1 text-base text-white"
            ></TextInput>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
