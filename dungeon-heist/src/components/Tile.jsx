import { useState } from "react";
import IsometricPlayer from "./IsometricPlayer";

const TILE_WIDTH = 60;
const TILE_HEIGHT = TILE_WIDTH * 0.5;
const BASE_DEPTH = 30;

const TERRAIN_TYPES = {
	GRASS: {
		top: "#90EE90", // Lighter green
		right: "#B8977E", // Lighter brown
		left: "#9E7E63", // Lighter brown
		heightMod: 1,
		name: "Grass",
	},
	SAND: {
		top: "#FFE7BA", // Lighter sand
		right: "#EED8B0",
		left: "#E6C998",
		heightMod: 0.8,
		name: "Sand",
	},
	SHALLOW_WATER: {
		top: "#87CEEB", // Lighter blue
		right: "#7AB8D4",
		left: "#6DA6C2",
		heightMod: 0.6,
		name: "Shallow Water",
	},
	DEEP_WATER: {
		top: "#4682B4", // Lighter deep blue
		right: "#3B6E99",
		left: "#305B80",
		heightMod: 0.4,
		name: "Deep Water",
	},
	MOUNTAIN: {
		top: "#D3D3D3", // Light gray
		right: "#BEBEBE",
		left: "#A9A9A9",
		heightMod: 2,
		name: "Mountain",
	},
	SNOW: {
		top: "#FFFFFF",
		right: "#F0F0F0",
		left: "#E8E8E8",
		heightMod: 1.2,
		name: "Snow",
	},
	HILL: {
		top: "#B8D5AA", // Lighter green
		right: "#9EBB90",
		left: "#85A177",
		heightMod: 1.5,
		name: "Hill",
	},
	FOREST: {
		top: "#558B2F", // Lighter forest green
		right: "#467024",
		left: "#375419",
		heightMod: 1.3,
		name: "Forest",
	},
};

const toIso = (x, y) => ({
	x: (x - y) * (TILE_WIDTH / 2),
	y: (x + y) * (TILE_HEIGHT / 2),
});

const Tile = ({
	x,
	y,
	terrainType = "GRASS",
	isSelected,
	onHover,
	player = null,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const { x: isoX, y: isoY } = toIso(x, y);

	const terrain = TERRAIN_TYPES[terrainType];
	const tileDepth = BASE_DEPTH; // * terrain.heightMod;

	const getOpacity = () => {
		if (isHovered) return 1;
		if (isSelected) return 0.85;
		return 0.95;
	};

	return (
		<g
			transform={`translate(${isoX}, ${isoY})`}
			onMouseEnter={() => {
				setIsHovered(true);
				onHover?.(x, y, true);
			}}
			onMouseLeave={() => {
				setIsHovered(false);
				onHover?.(x, y, false);
			}}
			style={{ cursor: "pointer" }}
		>
			{/* Right face */}
			<path
				d={`
            M ${TILE_WIDTH / 2} 0 
            L ${TILE_WIDTH / 2} ${tileDepth}
            L 0 ${TILE_HEIGHT / 2 + tileDepth}
            L 0 ${TILE_HEIGHT / 2}
          `}
				fill={terrain.right}
				opacity={getOpacity()}
			/>

			{/* Left face */}
			<path
				d={`
            M ${-TILE_WIDTH / 2} 0
            L ${-TILE_WIDTH / 2} ${tileDepth}
            L 0 ${TILE_HEIGHT / 2 + tileDepth}
            L 0 ${TILE_HEIGHT / 2}
          `}
				fill={terrain.left}
				opacity={getOpacity()}
			/>

			{/* Top face */}
			<path
				d={`
            M ${-TILE_WIDTH / 2} 0
            L 0 ${-TILE_HEIGHT / 2}
            L ${TILE_WIDTH / 2} 0
            L 0 ${TILE_HEIGHT / 2}
          `}
				fill={terrain.top}
				opacity={getOpacity()}
			/>

			{/* Player character if present */}
			{player && (
				<g transform={`translate(0, ${-TILE_HEIGHT / 4})`}>
					<IsometricPlayer color={player.color} />
					<text
						x="0"
						y="-20"
						textAnchor="middle"
						fill="white"
						fontSize="12"
						style={{ pointerEvents: "none" }}
					>
						{player.id}
					</text>
				</g>
			)}
		</g>
	);
};

export default Tile;
