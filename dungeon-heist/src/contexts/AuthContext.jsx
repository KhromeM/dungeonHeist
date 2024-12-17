import { createContext, useContext } from "react";
import { useAccount, useDisconnect } from "wagmi";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
	const { address, isConnected } = useAccount();
	const { disconnect } = useDisconnect();

	const value = {
		user: isConnected ? { address } : null,
		loading: false,
		logout: () => disconnect(),
		loginWithWallet: null,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
