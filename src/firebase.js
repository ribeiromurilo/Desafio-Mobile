import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, remove, onValue, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA-obsbnX-4BTRvvF_O0xa4BaQwWipDJn4",
    authDomain: "tasks-1d597.firebaseapp.com",
    projectId: "tasks-1d597",
    storageBucket: "tasks-1d597.appspot.com",
    messagingSenderId: "658506531551",
    appId: "1:658506531551:web:a75bed8883dc8710b1df6a",
    measurementId: "G-MQTF1JBX52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export {
    database,
    ref,
    push,
    remove,
    onValue,
    update
};
