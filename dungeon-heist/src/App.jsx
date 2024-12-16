import IsometricGrid from "./components/IsometricGrid";
import LoginHeader from "./components/DungeonHeader";

const App = () => {
	return (
			<div className="w-screen h-screen overflow-hidden">
				<LoginHeader />
				<IsometricGrid />
			</div>
	);
};
export default App;
