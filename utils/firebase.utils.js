import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoK4ozXsbgk_pvTmhOQlvVZQvk_eHzQxs",
    authDomain: "skyalert-b06ad.firebaseapp.com",
    projectId: "skyalert-b06ad",
    storageBucket: "skyalert-b06ad.appspot.com",
    messagingSenderId: "857643457665",
    appId: "1:857643457665:android:d452268b354fb1b7000180",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Sign Up with Email and Password
export const signUpWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up with email/password", error);
        throw error; // Re-throw the error so it can be handled by the calling code
    }
};

// Sign In with Email and Password
export const signInWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully");
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in with email/password", error);
        throw error;
    }
};

// Google Authentication
export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
};

// Sign Out
export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
};

// Copy user data to Firestore
export const copyUserDataToFirestore = async (user) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            await setDoc(userRef, {
                email: user.email,
                points: 0,
            });
        }
    } catch (error) {
        console.error("Error copying user data to Firestore", error);
        throw error;
    }
};