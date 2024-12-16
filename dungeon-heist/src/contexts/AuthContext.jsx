import { createContext, useContext, useState, useEffect } from "react";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { app } from "../services/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const auth = getAuth(app);
	const googleProvider = new GoogleAuthProvider();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, [auth]);

	const loginWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			return result.user;
		} catch (error) {
			console.error("Google login error:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Logout error:", error);
			throw error;
		}
	};

	const value = {
		user,
		loading,
		loginWithGoogle,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
