import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Tile from "./Tile";

const TILE_WIDTH = 60;

const IsometricGrid = () => {
	const [zoom, setZoom] = useState(0.5);
	const [hoveredTiles, setHoveredTiles] = useState(new Set());
	const containerRef = useRef(null);

	const handleTileHover = (x, y, isHovered) => {
		setHoveredTiles((prev) => {
			const next = new Set(prev);
			if (isHovered) {
				// Add adjacent tiles
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
			setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.2), 3));
		};

		if (element) {
			element.addEventListener("wheel", handleWheel, { passive: false });
			return () => element.removeEventListener("wheel", handleWheel);
		}
	}, []);

	const generateTerrain = () => {
		const tiles = [];
		const size = 16;

		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				let terrainType = "GRASS";

				if (x + y > 24) {
					terrainType = "DEEP_WATER";
				} else if (x + y > 22) {
					terrainType = "SHALLOW_WATER";
				} else if (x + y > 20) {
					terrainType = "SAND";
				}

				if (x < 5 && y < 5) {
					terrainType = "MOUNTAIN";
				} else if ((x === 7 || x === 8) && (y === 7 || y === 8)) {
					terrainType = "HILL";
				}

				if (x > 12 && y < 3) {
					terrainType = "SNOW";
				} else if (x > 8 && x < 12 && y > 2 && y < 6) {
					terrainType = "FOREST";
				}

				tiles.push({
					x,
					y,
					terrainType,
				});
			}
		}
		return tiles;
	};

	const players = [
		{ id: "P1", imgURL: "src/assets/chamica.png", x: 5, y: 5 },
		{ id: "P2", imgURL: "src/assets/chicken.png", x: 10, y: 5 },
		{ id: "P3", imgURL: "src/assets/turtle.png", x: 14, y: 13 },
		{ id: "P4", imgURL: "src/assets/mammoth.png", x: 2, y: 6 },
		{ id: "P5", imgURL: "src/assets/orda.png", x: 3, y: 12 },
		{ id: "P6", imgURL: "src/assets/giraffe.png", x: 12, y: 3 },
		{ id: "P7", imgURL: "src/assets/simbaza.png", x: 7, y: 8 },
		{ id: "P8", imgURL: "src/assets/unicorn.png", x: 8, y: 14 },
		{ id: "P9", imgURL: "src/assets/zebra.png", x: 3, y: 2 },
	];

	const viewBoxSize = 16 * (TILE_WIDTH + 10);

	return (
		<div className="w-full h-screen bg-gray-900" ref={containerRef}>
			<motion.div
				drag
				dragMomentum={false}
				className="w-full h-full"
				style={{
					scale: zoom,
					transition: "scale 0.2s ease-out",
				}}
			>
				<svg
					width="100%"
					height="100%"
					viewBox={`${-viewBoxSize / 2} ${
						-viewBoxSize / 2
					} ${viewBoxSize} ${viewBoxSize}`}
					preserveAspectRatio="xMidYMid meet"
				>
					{generateTerrain().map((tile) => {
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
	);
};

export default IsometricGrid;