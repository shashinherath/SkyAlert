// Profile.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from 'firebase/app';
import 'firebase/auth';
import { auth } from '@/utils/firebase.utils';
// Import tailwind-rn

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Clean up subscription on component unmount
  }, []);

  const handleProfileClick = () => {
    if (user) {
      // Log out if user is signed in
      firebase.auth().signOut().then(() => {
        alert("You have been logged out.");
      });
    } else {
     
      navigation.navigate('SignIn');
    }
  };

  return (
    <View className='absolute top-2 right-2 items-center'>
      <TouchableOpacity onPress={handleProfileClick}>
        <Image
          source={user ? {uri: user.photoURL} : require('../assets/images/avatar.png')} // Placeholder image if no photo
          className='w-10 h-10 rounded-full'
        />
      </TouchableOpacity>
      {user && <Text className='text-white text-xs'>{user.displayName}</Text>}
    </View>
  );
};

export default Profile;
