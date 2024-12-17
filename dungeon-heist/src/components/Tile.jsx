import { useState } from "react";

import {
	TERRAIN_TYPES,
	TILE_WIDTH,
	TILE_HEIGHT,
	BASE_DEPTH,
	WALL_ELEVATION,
} from "../utils/tiles";

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
	player = null, // { imageUrl: string, id: string }
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const { x: isoX, y: isoY } = toIso(x, y);

	const terrain = TERRAIN_TYPES[terrainType];
	const tileDepth = BASE_DEPTH;

	const getOpacity = () => {
		if (isHovered) return 1;
		if (isSelected) return 0.85;
		return 0.95;
	};

	// Terrain types that use custom SVG or image
	const customTerrainTypes = [
		"GRASS",
		"DEEP_WATER",
		"SNOW",
		"FOREST",
		"SAND",
		"SHALLOW_WATER",
		"MOUNTAIN",
		"WALL",
	];

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
			{/* Terrain SVG/Image for specific terrain types */}
			{customTerrainTypes.includes(terrainType) ? (
				<image
					href={terrain.svg || terrain.image}
					width={TILE_WIDTH}
					height={TILE_HEIGHT * 2}
					x={-TILE_WIDTH / 2}
					y={
						terrainType === "WALL"
							? -TILE_HEIGHT / 2 - WALL_ELEVATION
							: -TILE_HEIGHT / 2
					}
					opacity={getOpacity()}
				/>
			) : (
				<>
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
				</>
			)}

			{/* Player image overlay */}
			{player && (
				<g transform={`translate(0, ${-TILE_HEIGHT / 4})`}>
					<image
						href={player.imgURL}
						width={TILE_WIDTH * 0.7}
						height={TILE_WIDTH * 0.7}
						x={-TILE_WIDTH * 0.3}
						y={-TILE_WIDTH * 0.3}
						preserveAspectRatio="xMidYMid meet"
					/>
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
