import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const TILE_WIDTH = 60;
const TILE_HEIGHT = TILE_WIDTH * 0.5;
const TILE_DEPTH = 7;
const TILE_GAP = 5;

// Helper function to calculate isometric coordinates
const toIso = (x, y) => ({
	x: (x - y) * (TILE_WIDTH / 2),
	y: (x + y) * (TILE_HEIGHT / 2),
});

const Tile = ({ x, y, type = "default", isSelected, onClick, tileTypes }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { x: isoX, y: isoY } = toIso(x, y);

	const baseColor = tileTypes[type] || tileTypes.default;
	const fillColor = isSelected
		? tileTypes.selected
		: isHovered
		? tileTypes.hover
		: baseColor;

	return (
		<g
			transform={`translate(${isoX}, ${isoY})`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
			style={{ cursor: "pointer" }}
		>
			{/* Right side */}
			<path
				d={`
          M ${TILE_WIDTH / 2} 0 
          L ${TILE_WIDTH / 2} ${TILE_DEPTH}
          L 0 ${TILE_HEIGHT / 2 + TILE_DEPTH}
          L 0 ${TILE_HEIGHT / 2}
        `}
				fill="#e4e4e4"
				opacity="0.8"
			/>

			{/* Left side */}
			<path
				d={`
          M ${-TILE_WIDTH / 2} 0
          L ${-TILE_WIDTH / 2} ${TILE_DEPTH}
          L 0 ${TILE_HEIGHT / 2 + TILE_DEPTH}
          L 0 ${TILE_HEIGHT / 2}
        `}
				fill="#d4d4d4"
				opacity="0.8"
			/>

			{/* Top face */}
			<path
				d={`
          M ${-TILE_WIDTH / 2} 0
          L 0 ${-TILE_HEIGHT / 2}
          L ${TILE_WIDTH / 2} 0
          L 0 ${TILE_HEIGHT / 2}
          Z
        `}
				fill={fillColor}
				stroke="#e0e0e0"
				strokeWidth="0.5"
			/>
		</g>
	);
};

const IsometricGrid = ({
	width = 6,
	height = 6,
	tileTypes = {
		default: "#ffffff",
		selected: "#f0f0f0",
		hover: "#fafafa",
		empty: "transparent",
	},
	tiles = [], // Array of {x, y, type}
}) => {
	const [selectedTile, setSelectedTile] = useState(null);
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef(null);

	// Calculate viewBox size based on grid dimensions
	const maxDim = Math.max(width, height);
	const viewBoxSize = maxDim * (TILE_WIDTH + TILE_GAP) * 1.5;

	// Handle zooming
	const handleWheel = (e) => {
		e.preventDefault();
		const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
		setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 3));
	};

	// Ensure selected tile is visible
	useEffect(() => {
		if (selectedTile && containerRef.current) {
			const { x, y } = toIso(selectedTile.x, selectedTile.y);
			const container = containerRef.current.getBoundingClientRect();
			const padding = 100;

			const targetX = Math.max(
				Math.min(position.x, x + container.width / 2 - padding),
				x - container.width / 2 + padding
			);
			const targetY = Math.max(
				Math.min(position.y, y + container.height / 2 - padding),
				y - container.height / 2 + padding
			);

			setPosition({ x: targetX, y: targetY });
		}
	}, [selectedTile]);

	return (
		<div
			className="w-full h-screen bg-gray-50"
			ref={containerRef}
			onWheel={handleWheel}
		>
			<motion.div
				drag
				dragMomentum={false}
				onDragStart={() => setIsDragging(true)}
				onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
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
					{Array.from({ length: height }, (_, y) =>
						Array.from({ length: width }, (_, x) => {
							const tileData = tiles.find((t) => t.x === x && t.y === y);
							const type = tileData?.type || "default";

							if (type !== "empty") {
								return (
									<Tile
										key={`${x}-${y}`}
										x={x}
										y={y}
										type={type}
										isSelected={selectedTile?.x === x && selectedTile?.y === y}
										onClick={() => !isDragging && setSelectedTile({ x, y })}
										tileTypes={tileTypes}
									/>
								);
							}
							return null;
						})
					)}
				</svg>
			</motion.div>
		</div>
	);
};

export default IsometricGrid;
