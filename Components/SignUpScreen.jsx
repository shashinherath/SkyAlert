// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { signUpWithEmailPassword } from '../utils/firebase.utils'; // Firebase function
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Gradient library

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    signUpWithEmailPassword(email, password)
      .then(() => {
        // Navigate to Home or Dashboard
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View className="flex-1 bg-gray-900 p-11 justify-center ">
    <View className="p-5 rounded-lg mt-12">
      <Text className="text-5xl text-white font-bold text-center">
        Sign Up with
      </Text>
      <Text className="text-teal-500 text-5xl text-center font-bold mt-5">
        Sky Alert
      </Text>
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
      <TextInput
        className="border-b border-gray-500 mb-4 text-white placeholder-white"
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#ccc"
      />
      
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-teal-700 p-4 rounded-lg mt-5"
      >
        <Text className="text-white text-center text-2xl">Sign Up</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
     

      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        className="mt-4"
      >
        <Text className="text-teal-500 text-center">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}
