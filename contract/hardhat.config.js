require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.19",
	networks: {
		base_sepolia: {
			url: "https://sepolia.base.org",
			accounts: [process.env.PRIVATE_KEY],
			chainId: 84532,
		},
	},
};
