import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const TILE_BASE = 60; // Base size for calculations
const TILE_WIDTH = TILE_BASE * 0.95; // Slightly smaller than base for gap
const TILE_HEIGHT = TILE_BASE * 0.45; // Maintain aspect ratio
const TILE_DEPTH = 2;

// Calculate isometric coordinates using base size for spacing but render smaller tiles
const toIso = (x, y) => ({
	x: (x - y) * (TILE_BASE / 2),
	y: (x + y) * ((TILE_BASE / 2) * 0.5),
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
          Z
        `}
				fill="#e4e4e4"
				opacity="0.9"
			/>

			{/* Left side */}
			<path
				d={`
          M ${-TILE_WIDTH / 2} 0
          L ${-TILE_WIDTH / 2} ${TILE_DEPTH}
          L 0 ${TILE_HEIGHT / 2 + TILE_DEPTH}
          L 0 ${TILE_HEIGHT / 2}
          Z
        `}
				fill="#d4d4d4"
				opacity="0.9"
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
				stroke={isHovered ? "#e0e0e0" : "none"}
				strokeWidth="0.5"
			/>
		</g>
	);
};

const IsometricGrid = ({
	width = 16,
	height = 16,
	tileTypes = {
		default: "#ffffff",
		selected: "#f0f0f0",
		hover: "#fafafa",
		empty: "transparent",
	},
	tiles = [],
}) => {
	const [selectedTile, setSelectedTile] = useState(null);
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef(null);

	const maxDim = Math.max(width, height);
	const viewBoxSize = maxDim * TILE_BASE * 1;

	useEffect(() => {
		const element = containerRef.current;
		const handleWheel = (e) => {
			e.preventDefault();
			const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
			setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 3));
		};

		element?.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			element?.removeEventListener("wheel", handleWheel);
		};
	}, []);

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
		<div className="w-full h-screen bg-gray-900" ref={containerRef}>
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
							return (
								<Tile
									key={`${x}-${y}`}
									x={x}
									y={y}
									isSelected={selectedTile?.x === x && selectedTile?.y === y}
									onClick={() => !isDragging && setSelectedTile({ x, y })}
									tileTypes={tileTypes}
								/>
							);
						})
					)}
				</svg>
			</motion.div>
		</div>
	);
};

export default IsometricGrid;
