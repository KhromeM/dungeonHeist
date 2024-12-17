import { useState } from "react";
import IsometricGrid from "./components/IsometricGrid";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";

const App = () => {
	const [players, setPlayers] = useState([
		{ id: "P1", imgURL: "/assets/chamica.png", x: 5, y: 5 },
		{ id: "P2", imgURL: "/assets/chicken.png", x: 10, y: 5 },
		{ id: "P3", imgURL: "/assets/turtle.png", x: 14, y: 13 },
		{ id: "P4", imgURL: "/assets/mammoth.png", x: 2, y: 6 },
		{ id: "P5", imgURL: "/assets/orda.png", x: 3, y: 12 },
		{ id: "P6", imgURL: "/assets/giraffe.png", x: 12, y: 3 },
		{ id: "P7", imgURL: "/assets/simbaza.png", x: 7, y: 8 },
		{ id: "P8", imgURL: "/assets/unicorn.png", x: 8, y: 14 },
		{ id: "P9", imgURL: "/assets/zebra.png", x: 3, y: 2 },
	]);

	const [isSwordActive, setIsSwordActive] = useState(false);
	const [isMailActive, setIsMailActive] = useState(false);
	const [selectedTarget, setSelectedTarget] = useState("Goblin");

	const handleDirectionClick = (direction) => {
		console.log(direction);
		// Update players state here if needed
		setPlayers(currentPlayers => {
			const updatedPlayers = [...currentPlayers];
			const playerIndex = updatedPlayers.findIndex(p => p.id === "P1");
			const player = updatedPlayers[playerIndex];
			
			let newX = player.x;
			let newY = player.y;
			switch(direction) {
				case 'UP':
					newY = Math.max(0, player.y - 1);
					break;
				case 'DOWN':
					newY = Math.min(15, player.y + 1);
					break;
				case 'LEFT':
					newX = Math.max(0, player.x - 1);
					break;
				case 'RIGHT':
					newX = Math.min(15, player.x + 1);
					break;
			}
			
			updatedPlayers[playerIndex] = { ...player, x: newX, y: newY };
			return updatedPlayers;
		});
	};

	return (
		<div className="w-screen h-screen overflow-hidden relative">
			<Sidebar />
			<Navbar />
			<IsometricGrid 
				players={players} 
				setPlayers={setPlayers}
				onDirectionClick={handleDirectionClick}
			/>
			<BottomBar
				isSwordActive={isSwordActive}
				setIsSwordActive={setIsSwordActive}
				isMailActive={isMailActive}
				setIsMailActive={setIsMailActive}
				selectedTarget={selectedTarget}
				setSelectedTarget={setSelectedTarget}
				onDirectionClick={handleDirectionClick}
			/>
		</div>
	);
};

export default App;