import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import { GameStateManager } from "./services/GameStateManager.mjs";
import { WebSocketManager } from "./services/WebSocketManager.mjs";
import { TurnProcessor } from "./services/TurnProcessor.mjs";
import { setupGameEndpoints } from "./endpoints/gameEndpoints.mjs";
import { setupAdminEndpoints } from "./endpoints/adminEndpoints.mjs";

const app = express();
const wsInstance = expressWs(app);
app.use(cors());

const gameStateManager = new GameStateManager();
const wsManager = new WebSocketManager(wsInstance);
const turnProcessor = new TurnProcessor(gameStateManager, wsManager);

// call function that checks if game is ongoing, if so updates the gamestatemanager from db
// else sets the initial state on the contract and the gamestatemanager

setupGameEndpoints(app, gameStateManager);
setupAdminEndpoints(app, gameStateManager);

function startTimerUpdates() {
	setInterval(() => {
		const now = Date.now();
		if (now >= gameStateManager.turnEndTime) {
			gameStateManager.resetTurnTimer();
			turnProcessor.processTurn();
		}

		wsManager.broadcast({
			type: "timer",
			state: gameStateManager.getTimeRemaining(),
		});
	}, 1000);
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	startTimerUpdates();
});
