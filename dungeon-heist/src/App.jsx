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

	return (
		<div className="w-screen h-screen overflow-hidden relative">
			<Sidebar />
			<Navbar />
			<IsometricGrid players={players} />
			<BottomBar setPlayers={setPlayers} />
		</div>
	);
};

export default App;
