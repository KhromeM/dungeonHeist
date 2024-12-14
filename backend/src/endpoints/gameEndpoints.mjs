export function setupGameEndpoints(app, gameStateManager) {
	app.ws("/game", async (ws, req) => {
		try {
			console.log("Client connected");

			let state = gameStateManager.getCachedState();
			ws.send(JSON.stringify(state));

			ws.on("error", (error) => {
				console.error("WebSocket error:", error);
			});
			ws.on("close", () => {
				console.log("Client disconnected");
			});
		} catch (error) {
			console.error("Error in WebSocket connection:", error);
			if (ws.readyState === 1) {
				ws.close(1011, "Internal server error");
			}
		}
	});

	app.get("/api/state", (req, res) => {
		try {
			const state = gameStateManager.getCachedState();
			if (!state.gameState) {
				return res
					.status(503)
					.json({ error: "Game state not yet initialized" });
			}
			res.json(state);
		} catch (error) {
			console.error("Error fetching game state:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	});

	app.get("/api/events", (req, res) => {
		try {
			const events = gameStateManager.unprocessedEvents;
			res.json(events);
		} catch (error) {
			console.error("Error fetching events:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	});
}
