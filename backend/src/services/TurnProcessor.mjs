import { safeContractCall } from "../utils/retry.mjs";
import {
	getGameState,
	startProcessing,
	stopProcessing,
	updateGameState,
} from "../utils/contractInteraction.mjs";

export class TurnProcessor {
	constructor(gameStateManager, wsManager) {
		this.gameStateManager = gameStateManager;
		this.wsManager = wsManager;
	}

	async processTurn() {
		try {
			console.log("Starting turn processing...");

			// Set contract to processing
			await safeContractCall(startProcessing);
			this.gameStateManager.cachedIsProcessing = true;
			this.wsManager.broadcast({ type: "processing", isProcessing: true });

			// Get current state and accumulated events
			const currentState = await safeContractCall(getGameState);
			const unprocessedEvents = this.gameStateManager.unprocessedEvents;

			console.log(
				`Processing ${unprocessedEvents.length} events for this turn`
			);

			if (unprocessedEvents.length > 0) {
				this.gameStateManager.lastProcessedBlock = Math.max(
					...unprocessedEvents.map((e) => e.blockNumber)
				);
			}

			// TODO: Process events and compute new state
			const newState = this.gameStateManager.cachedGameState; // replace with actual game logic
			const alivePlayers = currentState.filter(
				(e) => e.entityType === "Player"
			).length;

			await safeContractCall(updateGameState, newState, alivePlayers);
			await safeContractCall(stopProcessing);

			this.gameStateManager.updateCache(newState, false);
			this.wsManager.broadcast({ type: "processing", isProcessing: false });
			this.wsManager.broadcast({ type: "gameState", gameState: newState });

			console.log("Turn processing completed");
		} catch (error) {
			console.error("Error during turn processing:", error);
			try {
				await safeContractCall(stopProcessing);
				this.gameStateManager.updateCache(null, false);
				this.wsManager.broadcast({ type: "processing", isProcessing: false });
			} catch (stopError) {
				console.error("Error stopping processing:", stopError);
			}
		}
	}
}
