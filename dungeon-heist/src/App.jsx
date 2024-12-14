import IsometricGrid from "./IsometricGrid";

const App = () => {
	const tileTypes = {
		default: "#ffffff",
		selected: "#f0f0f0",
		hover: "#fafafa",
		empty: "transparent",
		water: "#e6f7ff",
		grass: "#e6ffe6",
		mountain: "#f5f5f5",
	};

	const tiles = [
		// { x: 2, y: 3, type: "water" },
		// { x: 3, y: 3, type: "water" },
		// { x: 4, y: 4, type: "mountain" },
		// { x: 1, y: 2, type: "empty" },
		// Add more tiles as needed
	];

	return (
		// <IsometricGrid width={8} height={8} tileTypes={tileTypes} tiles={tiles} />
		<IsometricGrid />
	);
};

export default App;
