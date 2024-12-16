import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
	appName: "DungeonHeist",
	projectId: "e7df0e7277ec915bd5625c2cce004386", // You may want your own project ID
	chains: [base],
	ssr: false, // Since we're not using Next.js
});
