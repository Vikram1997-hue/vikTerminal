import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDjY5TUjCkunJ_5Vaf9hItpeDcPNNZ3KZc",
  authDomain: "vikterminal-e9603.firebaseapp.com",
  databaseURL: "https://vikterminal-e9603.firebaseio.com",
  projectId: "vikterminal-e9603",
  storageBucket: "vikterminal-e9603.appspot.com",
  messagingSenderId: "55577252766",
  appId: "1:55577252766:web:ca547ebf6350da1719fc8f",
  measurementId: "G-23C37590S8", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };
