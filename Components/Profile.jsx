import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '@/utils/firebase.utils';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (user) {
      setDropdownVisible((prev) => !prev);
    } else {
      navigation.navigate('SignIn');
    }
  };

  const handleViewProfile = () => {
    setDropdownVisible(false);
    navigation.navigate('ProfileScreen'); 
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setDropdownVisible(false);
      navigation.replace('SignIn'); 
      alert("You have been logged out.");
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  return (
    <View className="absolute top-2 right-2 z-10">
      <TouchableOpacity onPress={handleProfileClick}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require('../assets/images/avatar.png')
          }
          className="w-10 h-10 rounded-full"
        />
      </TouchableOpacity>

      {dropdownVisible && user && (
        <View className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 min-w-[120px]">
          <Pressable 
            onPress={handleViewProfile}
            className="py-2 px-4 active:bg-gray-100"
          >
            <Text className="text-black">Wellcome {user.displayName}</Text>
          </Pressable>
          <Pressable 
            onPress={handleSignOut}
            className="py-2 px-4 border-t border-gray-200 active:bg-gray-100"
          >
            <Text className="text-red-500">Sign Out</Text>
          </Pressable>
          <Pressable 
          onPress={handleViewProfile}
          className="py-2 px-4 active:bg-gray-100"
        >
          <Text className="text-black">View Profile</Text>
        </Pressable>
        </View>
      )}
    </View>
  );
};

export default Profile;