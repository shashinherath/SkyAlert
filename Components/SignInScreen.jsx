// SignInScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native';
import { signInWithEmailPassword,signInWithGoogle } from '../utils/firebase.utils'; // Firebase function
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Gradient library

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signInWithEmailPassword(email, password)
      .then(() => {
       
        navigation.navigate('HomeTabs');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigation.navigate('HomeTabs');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View className="flex-1 bg-gray-900 p-11 justify-center ">
      <View className=" p-5 rounded-lg mt-12 flex justify-center items-center">
        <Text className="text-5xl text-white font-bold text-center">
          Sign In With 
        </Text>
        <Text className="text-teal-500 text-5xl text-center font-bold mt-5 "> Sky Alert</Text>
      </View>
      
      <View className="mt-8">
        <TextInput
          className="border-b border-gray-500 mb-4 text-white placeholder-white"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ccc"
        />
        <TextInput
          className="border-b border-gray-500 mb-4 text-white placeholder-white"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-teal-700 p-4 rounded-lg mt-5"
        >
          <Text className="text-white text-center text-2xl">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
  onPress={handleGoogleSignIn}
  className="bg-white p-4 rounded-lg mt-5 flex-row items-center justify-center"
>
  <Image
  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' }} // Google logo URL
    className="w-6 h-6 mr-3" // Adjust size and margin
  />
  <Text className="text-black text-center text-2xl">Sign In with Google</Text>
</TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="mt-4">
          <Text className="text-teal-500 text-center">Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
