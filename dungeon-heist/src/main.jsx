import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { CryptoProviders } from "./contexts/CryptoProviders.jsx";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CryptoProviders>
			<AuthProvider>
				<App />
			</AuthProvider>
		</CryptoProviders>
	</StrictMode>
);
