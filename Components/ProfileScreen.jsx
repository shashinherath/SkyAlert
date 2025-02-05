import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../utils/firebase.utils';
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
   const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          displayName: user.displayName || 'User',
          email: user.email || '',
          photoURL: user.photoURL || '',
          createdAt: user.metadata?.creationTime || new Date().toISOString(),
        });
      } else {
        navigation.replace('SignIn');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
        <Text className="text-white">No user data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1">
        {/* Header with back button */}
        <View className="flex-row items-center p-4">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-2"
          >
            <ArrowLeftIcon size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl text-white font-bold ml-4">Profile</Text>
        </View>

        {/* Profile Content */}
        <View className="items-center px-4">
          <Image
            source={
              userData.photoURL 
                ? { uri: userData.photoURL } 
                : require('../assets/images/avatar.png')
            }
            className="w-32 h-32 rounded-full mb-4"
          />
          <Text className="text-2xl text-white font-bold mb-2">
            {userData.displayName}
          </Text>
          <Text className="text-gray-400 mb-4">{userData.email}</Text>

          {/* Additional Profile Information */}
          <View className="w-full bg-gray-800 rounded-lg p-4 mb-4">
            <Text className="text-white text-lg mb-2">Account Information</Text>
            <Text className="text-gray-400">
              Member since: {new Date(userData.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen ;