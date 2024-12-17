import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import "./bottombar.css";

const BottomBar = ({ setPlayers }) => {
	const [isSwordActive, setIsSwordActive] = useState(false);
	const [isMailActive, setIsMailActive] = useState(false);
	const [selectedTarget, setSelectedTarget] = useState("Goblin");
	const { openConnectModal } = useConnectModal();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [message, setMessage] = useState("");

	const handleMessageToggle = (e) => {
		e.stopPropagation();
		setIsMailActive((prev) => !prev);
	};

	const handleDirectionClick = (direction) => {
		console.log(direction);
		// Update players state here if needed
		setPlayers((currentPlayers) => {
			const updatedPlayers = [...currentPlayers];
			const playerIndex = updatedPlayers.findIndex((p) => p.id === "P1");
			const player = updatedPlayers[playerIndex];

			let newX = player.x;
			let newY = player.y;
			switch (direction) {
				case "UP":
					newX = Math.max(0, player.x - 1);
					break;
				case "DOWN":
					newX = Math.min(24, player.x + 1);
					break;
				case "LEFT":
					newY = Math.min(24, player.y + 1);
					break;
				case "RIGHT":
					newY = Math.max(0, player.y - 1);
					break;
			}

			updatedPlayers[playerIndex] = { ...player, x: newX, y: newY };
			return updatedPlayers;
		});
	};

	return (
		<>
			{/* Message Panel */}
			<div
				className={`message-panel ${!isMailActive ? "hidden" : ""} ${
					isCollapsed ? "collapsed" : ""
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type your message here..."
					onClick={(e) => e.stopPropagation()}
				/>
				<div className="message-header">
					<button
						className="toggle-panel-btn"
						onClick={() => setIsCollapsed((prev) => !prev)}
					>
						{isCollapsed ? "Expand ▼" : "Collapse ▲"}
					</button>
				</div>
			</div>

			{/* Bottom Action Bar */}
			<div className="bottom-action-bar">
				<div className="directional-controls">
					<div></div>
					<button
						className="direction-btn button-up"
						onClick={() => handleDirectionClick("UP")}
					>
						▲
					</button>
					<div></div>
					<button
						className="direction-btn button-left"
						onClick={() => handleDirectionClick("LEFT")}
					>
						◀
					</button>
					<button
						className="direction-btn button-down"
						onClick={() => handleDirectionClick("DOWN")}
					>
						▼
					</button>
					<button
						className="direction-btn button-right"
						onClick={() => handleDirectionClick("RIGHT")}
					>
						▶
					</button>
				</div>

				<div className="controls-group">
					<button
						className={`action-btn ${isSwordActive ? "active" : ""}`}
						onClick={() => setIsSwordActive((prev) => !prev)}
					>
						✕
					</button>
					<button
						className={`action-btn ${isMailActive ? "active" : ""}`}
						onClick={handleMessageToggle}
					>
						💬
					</button>
				</div>

				<select
					className="target-select"
					value={selectedTarget}
					onChange={(e) => setSelectedTarget(e.target.value)}
				>
					<option value="Goblin">Goblin</option>
					<option value="Orc">Orc</option>
					<option value="Dragon">Dragon</option>
					<option value="Treasure">Treasure</option>
				</select>

				<button className="submit-btn" onClick={openConnectModal}>
					Submit
				</button>
			</div>
		</>
	);
};

export default BottomBar;
