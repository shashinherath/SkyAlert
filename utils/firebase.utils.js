import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
export const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(ReactNativeAsyncStorage));

// Initialize Firestore
const db = getFirestore(app);

// Sign Up with Email and Password
export const signUpWithEmailPassword = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up successfully");
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
    }
    return userCredential;
  } catch (error) {
    console.error("Error signing up with email/password", error);
    throw error; // Re-throw the error so it can be handled by the calling code
  }
};

// Sign In with Email and Password
export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
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

export const copyUserDataToFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || null,
        points: 0,
        createdAt: Date.now(),
      });
    }
  } catch (error) {
    console.error("Error copying user data to Firestore", error);
    throw error;
  }
};

// Function to get all user data from Firestore
export const getAllUserData = async () => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("points", "desc"));
    const querySnapshot = await getDocs(q);

    const users = [];
    let rank = 1;

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        rank: rank++,
        name: userData.displayName || "Anonymous",
        points: userData.points || 0,
        level: Math.floor((userData.points || 0) / 2500) + 1,
        imageUrl: `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? "men" : "women"
        }/${Math.floor(Math.random() * 100)}.jpg`,
      });
    });

    return users;
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
    throw error;
  }
};

export const updatePoints = async (userId, points) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      await setDoc(userRef, {
        ...userData,
        points: userData.points + points,
      });
    }
  } catch (error) {
    console.error("Error updating points", error);
    throw error;
  }
};
