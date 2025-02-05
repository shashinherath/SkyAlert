import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, getAllUserData } from "../utils/firebase.utils";
import "../global.css";

const LeaderboardItem = ({ rank, name, points, level, imageUrl, id }) => (
  <View className="flex-row items-center p-4 border-b border-gray-600">
    <Text
      className={`text-2xl w-8 ${
        rank === 1
          ? "text-yellow-400"
          : rank === 2
          ? "text-gray-400"
          : rank === 3
          ? "text-amber-700"
          : "text-gray-500"
      }`}
    >
      {rank}
    </Text>
    <Image
      source={require("../assets/images/avatar.png")}
      className="w-12 h-12 rounded-full border-2 border-teal-400"
    />
    <View className="flex-1 ml-4">
      <Text className="text-white text-lg font-semibold">
        {name}
        {auth.currentUser?.uid === id ? " (You)" : ""}
      </Text>
      <View className="bg-gray-700 h-2 rounded-full mt-2 w-full">
        <View
          className="bg-teal-400 h-2 rounded-full"
          style={{ width: `${(points / 2500) * 100}%` }}
        />
      </View>
    </View>
    <View className="items-end ml-4">
      <Text className="text-teal-400 font-bold">{points} pts</Text>
      <View className="flex-row items-center mt-1">
        <Text className="text-gray-400">Lvl {level}</Text>
      </View>
    </View>
  </View>
);

export default function LeaderboardScreen() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (auth.currentUser) {
      try {
        const users = await getAllUserData();
        setLeaderboardData(users);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#0bb3b2" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="p-4 border-b border-gray-800">
        <Text className="text-2xl font-bold text-white text-center">
          Leaderboard
        </Text>
        <Text className="text-gray-400 text-center mt-1">
          Top Weather Enthusiasts
        </Text>
      </View>

      {/* Leaderboard List */}
      {auth.currentUser ? (
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0bb3b2"
              colors={["#0bb3b2"]}
            />
          }
        >
          {leaderboardData.map((item, index) => (
            <LeaderboardItem key={index} {...item} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../assets/images/leaderboard.png")}
            className="w-48 h-48 m-10"
          />
          <Text className="text-2xl font-extrabold text-center text-gray-400">
            Sign In or Sign Up to view the Leaderboard
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
