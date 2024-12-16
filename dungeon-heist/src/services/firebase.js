import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyACLiyjW3MnpFF7pTV5jdlUPr_zpxZgNaI",
	authDomain: "dungeonheist-16b79.firebaseapp.com",
	projectId: "dungeonheist-16b79",
	storageBucket: "dungeonheist-16b79.firebasestorage.app",
	messagingSenderId: "499425596383",
	appId: "1:499425596383:web:f434c84fe1238eb94b2a6a",
	measurementId: "G-G710JWXPL9",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
