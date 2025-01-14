
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from 'firebase/app';
import 'firebase/auth';
import { auth } from '@/utils/firebase.utils';


const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  const handleProfileClick = () => {
    if (user) {
      
  
     
    } else {
     
      navigation.navigate('SignIn');
    }
  };

  const handleSignOut = () => {
    if (user) {
     
      auth.signOut().then(() => {
        alert("You have been logged out.");
      });
    } else {
     
      navigation.navigate('SignIn');
    }
    
  }

  return (
    <View className='absolute top-2 right-2 items-center'>
      <TouchableOpacity onPress={handleProfileClick}>
        <Image
          source={user ? {uri: user.photoURL} : require('../assets/images/avatar.png')} // Placeholder image if no photo
          className='w-10 h-10 rounded-full'
        />
        <TouchableOpacity onPress={handleSignOut}>
      {user && <Text className='text-white text-xs'>Sign Out</Text>}
      </TouchableOpacity>
      </TouchableOpacity>
      
    </View>
  );
};

export default Profile;
