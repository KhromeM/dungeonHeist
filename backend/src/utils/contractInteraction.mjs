import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const PLAYER_FEE = ethers.parseEther("0.0025");
const ABI = [
	// Functions
	"function submitMessage(uint8 actionType, bytes calldata data) external payable",
	"function startTurnProcessing() external",
	"function stopTurnProcessing() external",
	"function updateGameState(tuple(address addr, tuple(uint8 entityType, uint8 x, uint8 y, uint8 weapon, uint8 status, uint16 hp, uint256 money, string name) entity)[] newEntities, uint8 alivePlayers) external",
	"function getGameState() external view returns (tuple(address addr, tuple(uint8 entityType, uint8 x, uint8 y, uint8 weapon, uint8 status, uint16 hp, uint256 money, string name) entity)[])",
	"function withdraw(uint256 amount, address to) external",
	"function isProcessing() external view returns (bool)",

	// Events
	"event PlayerMessage(address indexed player, uint8 actionType, bytes data, uint256 timestamp)",
	"event TurnProcessing(uint256 timestamp, bool isProcessing)",
	"event GameStateUpdated(uint256 timestamp)",
	"event Withdraw(address indexed to, uint256 amount, uint256 timestamp)",
	"event FeeDistributed(uint256 toChests, uint256 toDev)",
];
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);

const EntityType = {
	0: "Player",
	1: "Guard",
	2: "Chest",
	3: "Weapon",
};

const ActionType = {
	0: "Join",
	1: "Move",
	2: "Chat",
	3: "Attack",
};

const Status = {
	0: "Default",
	1: "Walking",
	2: "Chatting",
	3: "Attacking",
};

// Example entity for testing
const createTestEntity = (addr, type = 0, x = 0, y = 0) => ({
	addr,
	entity: {
		entityType: type,
		x,
		y,
		weapon: 0,
		status: 0,
		hp: 100,
		money: ethers.parseEther("1"),
		name: "TestEntity",
	},
});

export const submitJoinAction = async () => {
	try {
		const JOIN_ACTION = 0;
		const EMPTY_BYTES = "0x";

		const tx = await contract.submitMessage(JOIN_ACTION, EMPTY_BYTES, {
			value: PLAYER_FEE,
		});

		const receipt = await tx.wait();
		console.log("Join action submitted:", receipt.hash);
		return receipt;
	} catch (error) {
		console.error("Error submitting join action:", error.message);
		throw error;
	}
};

export const submitMoveAction = async (x, y) => {
	try {
		const MOVE_ACTION = 1; // ActionType.Move
		const moveData = ethers.AbiCoder.defaultAbiCoder().encode(
			["uint8", "uint8"],
			[x, y]
		);

		const tx = await contract.submitMessage(MOVE_ACTION, moveData, {
			value: PLAYER_FEE,
		});
		const receipt = await tx.wait();
		console.log("Move action submitted:", receipt.hash);
		return receipt;
	} catch (error) {
		console.error("Error submitting move action:", error.message);
		throw error;
	}
};

export const checkProcessingStatus = async () => {
	try {
		const processing = await contract.isProcessing();
		console.log("Game processing status:", processing);
		return processing;
	} catch (error) {
		console.error("Error checking processing status:", error.message);
		throw error;
	}
};
export const startProcessing = async () => {
	try {
		const tx = await contract.startTurnProcessing();
		const receipt = await tx.wait();
		console.log("Started processing mode:", receipt.hash);
		return receipt;
	} catch (error) {
		console.error("Error starting processing mode:", error.message);
		throw error;
	}
};

export const stopProcessing = async () => {
	try {
		const tx = await contract.stopTurnProcessing();
		const receipt = await tx.wait();
		console.log("Stopped processing mode:", receipt.hash);
		return receipt;
	} catch (error) {
		console.error("Error stopping processing mode:", error.message);
		throw error;
	}
};

export const updateGameState = async (entities, alivePlayers) => {
	try {
		const tx = await contract.updateGameState(entities, alivePlayers);
		const receipt = await tx.wait();
		console.log("Game state updated:", receipt.hash);
		return receipt;
	} catch (error) {
		console.error("Error updating game state:", error.message);
		throw error;
	}
};

export const withdraw = async (amount, to) => {
	try {
		const tx = await contract.withdraw(amount, to);
		const receipt = await tx.wait();
		console.log("Withdrawal successful:", receipt.hash);
		return receipt;
	} catch (error) {
		console.error("Error withdrawing funds:", error.message);
		throw error;
	}
};

export const getGameState = async () => {
	try {
		const state = await contract.getGameState();

		// Parse and format the state
		const formattedState = state.map((entity) => ({
			address: entity.addr,
			entityType: EntityType[entity.entity.entityType],
			position: {
				x: entity.entity.x,
				y: entity.entity.y,
			},
			weapon: entity.entity.weapon,
			status: Status[entity.entity.status],
			hp: entity.entity.hp,
			money: ethers.formatEther(entity.entity.money),
			name: entity.entity.name,
		}));

		return formattedState;
	} catch (error) {
		console.error("Error getting game state:", error.message);
		throw error;
	}
};

export const getEvents = async (blocks = 25) => {
	try {
		const filter = {
			fromBlock: (await provider.getBlockNumber()) - blocks,
			toBlock: "latest",
		};

		console.log(
			`\nQuerying events from block ${filter.fromBlock} to ${filter.toBlock}`
		);

		const events = await contract.queryFilter(
			"*",
			filter.fromBlock,
			filter.toBlock
		);
		events.sort((a, b) => a.blockNumber - b.blockNumber);

		events.forEach((event) => {
			switch (event.eventName) {
				case "PlayerMessage": {
					const { player, actionType, data, timestamp } = event.args;
					console.log("\nPlayer Message Event:");
					console.log("Player:", player);
					console.log("Action:", ActionType[actionType]);
					console.log("Data:", data);
					console.log(
						"Time:",
						new Date(Number(timestamp) * 1000).toLocaleString()
					);
					console.log("Transaction:", event.transactionHash);
					console.log("Block:", event.blockNumber);
					break;
				}
				case "TurnProcessing": {
					const { timestamp, isProcessing } = event.args;
					console.log("\nTurn Processing Event:");
					console.log("Processing Status:", isProcessing);
					console.log(
						"Time:",
						new Date(Number(timestamp) * 1000).toLocaleString()
					);
					console.log("Transaction:", event.transactionHash);
					console.log("Block:", event.blockNumber);
					break;
				}
				case "GameStateUpdated": {
					const { timestamp } = event.args;
					console.log("\nGame State Updated Event:");
					console.log(
						"Time:",
						new Date(Number(timestamp) * 1000).toLocaleString()
					);
					console.log("Transaction:", event.transactionHash);
					console.log("Block:", event.blockNumber);
					break;
				}
				case "Withdraw": {
					const { to, amount, timestamp } = event.args;
					console.log("\nWithdraw Event:");
					console.log("To:", to);
					console.log("Amount:", ethers.formatEther(amount), "ETH");
					console.log(
						"Time:",
						new Date(Number(timestamp) * 1000).toLocaleString()
					);
					console.log("Transaction:", event.transactionHash);
					console.log("Block:", event.blockNumber);
					break;
				}
				case "FeeDistributed": {
					const { toChests, toDev } = event.args;
					console.log("\nFee Distributed Event:");
					console.log("To Chests:", ethers.formatEther(toChests), "ETH");
					console.log("To Dev:", ethers.formatEther(toDev), "ETH");
					console.log("Transaction:", event.transactionHash);
					console.log("Block:", event.blockNumber);
					break;
				}
			}
		});

		return {
			playerMessages: events.filter((e) => e.eventName === "PlayerMessage"),
			turnProcessing: events.filter((e) => e.eventName === "TurnProcessing"),
			stateUpdated: events.filter((e) => e.eventName === "GameStateUpdated"),
			withdrawals: events.filter((e) => e.eventName === "Withdraw"),
			feeDistributed: events.filter((e) => e.eventName === "FeeDistributed"),
		};
	} catch (error) {
		console.error("Error getting events:", error);
		throw error;
	}
};
// await checkProcessingStatus();
// await startProcessing();
// try {
// 	await submitJoinAction();
// } catch {}
// await checkProcessingStatus();
// await stopProcessing();
// await checkProcessingStatus();
// await submitJoinAction();
// await submitMoveAction(5, 5);

// await getEvents();
// await withdraw(
// 	ethers.parseEther("0.0125"),
// 	"0xFa6A9c2C8E5bf5c37f702e8Cb46606F6e2c4C3E0"
// );

// const testEntities = [
// 	createTestEntity("0x1e56b866bd8a0fd2cceb5527ed6bc1313466bc23"),
// 	createTestEntity("0x1F2A20F62d7F18C166f178e53E6224baEE54154B", 1, 5, 5),
// ];
// await updateGameState(testEntities, 1);

// // Withdraw 0.1 ETH to specific address
// await withdraw(ethers.parseEther("0.1"), "0x123...");

// const gameState = await getGameState();
// console.log("Current game state:", gameState);
