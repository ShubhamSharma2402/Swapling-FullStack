import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// Note: While the apiKey is correct based on your request, Firebase authentication 
// typically requires the authDomain and projectId to successfully popup the Google sign-in.
// If you encounter an error, make sure to copy the FULL config object from Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyBk8mEqoH3LhGaekDSXZoG1U6jiETeXDLM",
  authDomain: "swapling-app.firebaseapp.com", // Replace if needed
  projectId: "swapling-app", // Replace if needed
  storageBucket: "swapling-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
