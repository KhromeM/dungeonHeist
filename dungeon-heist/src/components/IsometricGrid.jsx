import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Tile from "./Tile";
import { cityMatrix, TILES } from "../utils/map";
import { TILE_WIDTH } from "../utils/tiles";

const INITIAL_ZOOM = 3;

const IsometricGrid = ({ players, setPlayers, onDirectionClick }) => {
	const [zoom, setZoom] = useState(INITIAL_ZOOM);
	const [hoveredTiles, setHoveredTiles] = useState(new Set());
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [terrain, setTerrain] = useState([]); // Store fixed terrain data
	const containerRef = useRef(null);

	// Generate the maze only once
	useEffect(() => {
		const walls = generateMaze();
		const terrainData = generateTerrain(walls);
		setTerrain(terrainData);
	}, []);

	const handleTileHover = (x, y, isHovered) => {
		setHoveredTiles((prev) => {
			const next = new Set(prev);
			if (isHovered) {
				next.add(`${x},${y}`);
				next.add(`${x + 1},${y}`);
				next.add(`${x - 1},${y}`);
				next.add(`${x},${y + 1}`);
				next.add(`${x},${y - 1}`);
			} else {
				next.clear();
			}
			return next;
		});
	};

	useEffect(() => {
		const element = containerRef.current;
		const handleWheel = (e) => {
			e.preventDefault();
			const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
			setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 1), 6));
		};

		if (element) {
			element.addEventListener("wheel", handleWheel, { passive: false });
			return () => element.removeEventListener("wheel", handleWheel);
		}
	}, []);

	const viewBoxSize = 25 * (TILE_WIDTH + 10);

	return (
		<div className="h-full w-full flex flex-col overflow-hidden">
			{/* Game area */}
			<div
				className="flex-1 bg-gray-900 relative overflow-hidden"
				ref={containerRef}
			>
				<motion.div
					drag
					dragMomentum={false}
					animate={position}
					className="touch-none  mx-auto"
					style={{
						scale: zoom,
						transition: "scale 0.2s ease-out",
					}}
				>
					<svg
						height="600px"
						width="100%"
						viewBox={`${-viewBoxSize / 2} ${
							-viewBoxSize / 2
						} ${viewBoxSize} ${viewBoxSize}`}
						preserveAspectRatio="xMidYMid meet"
					>
						{terrain.map((tile) => {
							const player = players.find(
								(p) => p.x === tile.x && p.y === tile.y
							);
							return (
								<Tile
									key={`${tile.x}-${tile.y}`}
									{...tile}
									player={player}
									isSelected={hoveredTiles.has(`${tile.x},${tile.y}`)}
									onHover={handleTileHover}
								/>
							);
						})}
					</svg>
				</motion.div>
			</div>
		</div>
	);
};

const generateMaze = () => {
	const size = 25;
	const maze = Array.from({ length: size }, () => Array(size).fill(1)); // Start with all walls (1 = wall, 0 = path)

	const directions = [
		{ x: 0, y: -1 }, // Up
		{ x: 1, y: 0 }, // Right
		{ x: 0, y: 1 }, // Down
		{ x: -1, y: 0 }, // Left
	];

	const isInsideGrid = (x, y) => x >= 0 && y >= 0 && x < size && y < size;

	const shuffle = (array) => array.sort(() => Math.random() - 0.5);

	const carvePath = (x, y) => {
		maze[y][x] = 0; // Make this cell a path

		const shuffledDirections = shuffle(directions);
		for (const { x: dx, y: dy } of shuffledDirections) {
			const nx = x + dx * 2; // Next cell to carve
			const ny = y + dy * 2;

			if (isInsideGrid(nx, ny) && maze[ny][nx] === 1) {
				maze[y + dy][x + dx] = 0; // Carve a path to the next cell
				carvePath(nx, ny); // Recur
			}
		}
	};

	// Start carving from the top-left corner
	carvePath(0, 0);

	// Convert the maze to a set of wall coordinates
	const walls = [];
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (maze[y][x] === 1) {
				walls.push({ x, y });
			}
		}
	}

	return walls;
};

const generateTerrain2 = (walls) => {
	const tiles = [];
	const size = 25;

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			let terrainType = "GRASS";
			const isWall = walls.some((wall) => wall.x === x && wall.y === y);

			if (isWall) {
				terrainType = "WALL";
			} else {
				if (x + y > 24) {
					terrainType = "SHALLOW_WATER";
				} else if (x + y > 22) {
					terrainType = "SHALLOW_WATER";
				} else if (x + y > 20) {
					terrainType = "SAND";
				}

				if (x < 5 && y < 5) {
					terrainType = "MOUNTAIN";
				}

				if (x > 12 && y < 3) {
					terrainType = "SNOW";
				} else if (x > 6 && x < 13 && y > 2 && y < 6) {
					terrainType = "FOREST";
				}
			}

			tiles.push({ x, y, terrainType });
		}
	}
	return tiles;
};

const generateTerrain = () => {
	const tiles = [];
	const height = 20;
	const width = 25;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let terrainType = TILES[cityMatrix[y][x]] || "CITY_GENERAL";
			// const isWall = walls.some((wall) => wall.x === x && wall.y === y);

			// if (isWall && terrainType === "CITY_GENERAL") {
			// 	terrainType = "BUILDING";
			// }

			tiles.push({ x, y, terrainType });
		}
	}
	return tiles;
};

export default IsometricGrid;
