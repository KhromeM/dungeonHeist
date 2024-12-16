import { useState } from "react";
import IsometricGrid from "./components/IsometricGrid";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";

const App = () => {
	const [isSwordActive, setIsSwordActive] = useState(false);
	const [isMailActive, setIsMailActive] = useState(false);
	const [selectedTarget, setSelectedTarget] = useState("Goblin");

	return (
		<div className="w-screen h-screen overflow-hidden relative">
			<Sidebar />
			<Navbar />
			<IsometricGrid />
			<BottomBar
				isSwordActive={isSwordActive}
				setIsSwordActive={setIsSwordActive}
				isMailActive={isMailActive}
				setIsMailActive={setIsMailActive}
				selectedTarget={selectedTarget}
				setSelectedTarget={setSelectedTarget}
			/>
		</div>
	);
};

export default App;
