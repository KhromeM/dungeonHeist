import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
	appName: "dungeonheist",
	projectId: "9699b74e8efc3649f2b40109faa993b8",
	chains: [base],
});
