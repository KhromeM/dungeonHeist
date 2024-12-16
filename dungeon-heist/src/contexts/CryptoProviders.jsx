import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../wagmi";

// Create a client
const queryClient = new QueryClient();

export function CryptoProviders({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiConfig config={config}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</WagmiConfig>
		</QueryClientProvider>
	);
}
