import React from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

const LeaderboardItem = ({ rank, name, points, level, imageUrl }) => (
  <View className="flex-row items-center p-4 border-b border-gray-600">
    {/* Rank with special styling for top 3 */}
    <Text className={`text-2xl w-8 ${
      rank === 1 ? 'text-yellow-400' :
      rank === 2 ? 'text-gray-400' :
      rank === 3 ? 'text-amber-700' :
      'text-gray-500'
    }`}>
      {rank}
    </Text>
    
    {/* Avatar */}
    <Image 
      source={{ uri: imageUrl }} 
      className="w-12 h-12 rounded-full border-2 border-teal-400"
    />
    
    {/* User Info */}
    <View className="flex-1 ml-4">
      <Text className="text-white text-lg font-semibold">{name}</Text>
      {/* Progress Bar */}
      <View className="bg-gray-700 h-2 rounded-full mt-2 w-full">
        <View
          className="bg-teal-400 h-2 rounded-full"
          style={{ width: `${(points / 2500) * 100}%` }}
        />
      </View>
    </View>
    
    {/* Score Details */}
    <View className="items-end ml-4">
      <Text className="text-teal-400 font-bold">{points} pts</Text>
      <View className="flex-row items-center mt-1">
        <Text className="text-gray-400">Lvl {level}</Text>
      </View>
    </View>
  </View>
);

export default function LeaderboardScreen() {
  const leaderboardData = [
    {
      rank: 1,
      name: "John Doe",
      points: 2300,
      level: 5,
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      rank: 2,
      name: "Jane Smith",
      points: 2100,
      level: 4,
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      rank: 3,
      name: "Mike Johnson",
      points: 1900,
      level: 4,
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      rank: 4,
      name: "Sarah Wilson",
      points: 1800,
      level: 3,
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      rank: 5,
      name: "Alex Brown",
      points: 1700,
      level: 3,
      imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
    }
  ];

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
      <ScrollView className="flex-1">
        {leaderboardData.map((item, index) => (
          <LeaderboardItem key={index} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
