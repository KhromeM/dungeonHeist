import IsometricGrid from "./components/IsometricGrid";
import LoginHeader from "./components/DungeonHeader";
import Sidebar from "./components/Sidebar";
const App = () => {
	return (
			<div className="w-screen h-screen overflow-hidden">
				<LoginHeader />
				<Sidebar />
				<IsometricGrid />
			</div>
	);
};
export default App;