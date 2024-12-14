import { ethers } from "ethers";
import express from "express";
import {
	checkProcessingStatus,
	startProcessing,
	stopProcessing,
	submitJoinAction,
	submitMoveAction,
	updateGameState,
	getGameState,
	withdraw,
	getEvents,
} from "../utils/contractInteraction.mjs";

export function setupAdminEndpoints(app) {
	const router = express.Router();
	console.log("SETTING UP ADMIN ENDPOINTS");
	// Admin auth middleware
	const authenticateAdmin = (req, res, next) => {
		const adminPassword = process.env.ADMIN_PASSWORD;
		if (!adminPassword) {
			return res.status(500).json({ error: "Admin password not configured" });
		}
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ error: "Authorization header required" });
		}

		const password = authHeader.split(" ")[1];
		if (password !== adminPassword) {
			return res.status(403).json({ error: "Invalid admin password" });
		}
		next();
	};

	router.use(authenticateAdmin);

	router.post("/processing/status", async (req, res) => {
		try {
			const processing = await checkProcessingStatus();
			res.json({ processing });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/processing/start", async (req, res) => {
		try {
			const receipt = await startProcessing();
			res.json({ txHash: receipt.hash });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/processing/stop", async (req, res) => {
		try {
			const receipt = await stopProcessing();
			res.json({ txHash: receipt.hash });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/actions/join", async (req, res) => {
		try {
			const receipt = await submitJoinAction();
			res.json({ txHash: receipt.hash });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/actions/move", async (req, res) => {
		try {
			const { x, y } = req.body;
			if (typeof x !== "number" || typeof y !== "number") {
				return res.status(400).json({ error: "x and y coordinates required" });
			}
			const receipt = await submitMoveAction(x, y);
			res.json({ txHash: receipt.hash });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/state/update", async (req, res) => {
		try {
			const { entities, alivePlayers } = req.body;
			if (!Array.isArray(entities) || typeof alivePlayers !== "number") {
				return res.status(400).json({ error: "Invalid request body format" });
			}
			const receipt = await updateGameState(entities, alivePlayers);
			res.json({ txHash: receipt.hash });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/state/current", async (req, res) => {
		try {
			const state = await getGameState();
			res.json(state);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/withdraw", async (req, res) => {
		try {
			const { amount, to } = req.body;
			if (!amount || !to) {
				return res
					.status(400)
					.json({ error: "amount and to address required" });
			}
			const receipt = await withdraw(ethers.parseEther(amount.toString()), to);
			res.json({ txHash: receipt.hash });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	router.post("/events", async (req, res) => {
		try {
			const { blocks } = req.body;
			const events = await getEvents(blocks ? parseInt(blocks) : 25);
			res.json(events);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	app.use("/api/admin", router);
}
