//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyAMRkjI6bo34SU2pmcS_e7iA-fXbKl8tG0",
    authDomain: "map-app-bcit-bby.firebaseapp.com",
    projectId: "map-app-bcit-bby",
    storageBucket: "map-app-bcit-bby.appspot.com",
    messagingSenderId: "503617078108",
    appId: "1:503617078108:web:9ec564ff811d27b566f799"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
