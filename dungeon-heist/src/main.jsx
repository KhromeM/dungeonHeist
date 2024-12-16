import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./contexts/providers.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>
);
