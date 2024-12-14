import { safeContractCall } from "../utils/retry.mjs";
import { getEvents } from "../utils/contractInteraction.mjs";

export class GameStateManager {
	constructor() {
		this.cachedGameState = []; // list of entities
		this.cachedIsProcessing = false;
		this.lastProcessedBlock = 0;
		this.TURN_DURATION = 5 * 60 * 1000;
		this.turnEndTime = Date.now() + this.TURN_DURATION;
		this.unprocessedEvents = [];
		this.startEventPolling();
	}

	getTimeRemaining() {
		return Math.max(0, this.turnEndTime - Date.now());
	}

	resetTurnTimer() {
		this.turnEndTime = Date.now() + this.TURN_DURATION;
	}

	updateCache(gameState, isProcessing) {
		this.cachedGameState = gameState;
		this.cachedIsProcessing = isProcessing;
	}

	getCachedState() {
		return {
			gameState: this.cachedGameState,
			isProcessing: this.cachedIsProcessing,
			turnEndTime: this.turnEndTime,
			timeRemaining: this.getTimeRemaining(),
			events: this.unprocessedEvents,
		};
	}

	addEvents(events) {
		const newEvents = events.filter(
			(event) => event.blockNumber > this.lastProcessedBlock
		);

		const existingEventHashes = new Set(
			this.unprocessedEvents.map((e) => e.transactionHash)
		);

		const uniqueNewEvents = newEvents.filter(
			(event) => !existingEventHashes.has(event.transactionHash)
		);

		this.unprocessedEvents.push(...uniqueNewEvents);
	}

	startEventPolling() {
		setInterval(async () => {
			try {
				const events = await safeContractCall(getEvents);

				if (events.playerMessages.length > 0) {
					this.addEvents(events.playerMessages);
				}
			} catch (error) {
				console.error("Error polling events:", error);
			}
		}, 5000);
	}
}
