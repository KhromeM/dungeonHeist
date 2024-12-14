const hre = require("hardhat");

async function deploy() {
	const DungeonGame = await hre.ethers.getContractFactory("DungeonGame");
	const dungeonGame = await DungeonGame.deploy();

	await dungeonGame.waitForDeployment();

	const address = await dungeonGame.getAddress();
	console.log("DungeonGame deployed to:", address);
}

deploy()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
//npx hardhat run scripts/deploy.js --network base_sepolia
