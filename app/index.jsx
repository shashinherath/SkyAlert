import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Components/HomeScreen";
import LeaderboardScreen from "../Components/LeaderboardScreen";
import { Ionicons } from "@expo/vector-icons";
import SignInScreen from "../Components/SignInScreen";
import SignUpScreen from "../Components/SignUpScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "trophy" : "trophy-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0bb3b2",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#1F2937" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
}

export default function Index() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
     <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
     <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
