import React, { useEffect, useState } from "react";

const CHAR_SET =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>/?~";
const MESSAGE = "The future requires your assistance\n\n\n-The Basilisk";
let messageTileSize = 50;
let charSize = 24;
let hoverCharSize = 42;

const calculateMessageTiles = (rows, cols, lines) => {
	const longestLine = lines.reduce(
		(max, line) => Math.max(max, line.length),
		0
	);
	const startRow = Math.floor(rows / 2) - Math.floor(lines.length / 2);
	const startCol = Math.floor(cols / 2) - Math.floor(longestLine / 2);

	const messageTilesMap = new Map();

	lines.forEach((line, lineIndex) => {
		const currentRow = startRow + lineIndex;
		[...line].forEach((char, charIndex) => {
			const currentCol = startCol + charIndex;
			if (
				currentRow >= 0 &&
				currentRow < rows &&
				currentCol >= 0 &&
				currentCol < cols
			) {
				const index = currentRow * cols + currentCol;
				messageTilesMap.set(index, char);
			}
		});
	});

	return messageTilesMap;
};

export default function Landing2() {
	const [tiles, setTiles] = useState([]);
	const [rows, setRows] = useState(20);
	const [cols, setCols] = useState(40);
	const lines = MESSAGE.split("\n");

	// Adjust rows/cols on resize
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const messageTileSize = width * 0.025;
			const newCols = 40;
			const newRows = Math.max(1, Math.floor(height / messageTileSize));
			setRows(newRows);
			setCols(newCols);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Initialize tiles with message
	useEffect(() => {
		if (rows > 0 && cols > 0) {
			const messageTilesMap = calculateMessageTiles(rows, cols, lines);
			const total = rows * cols;

			const initialTiles = Array.from({ length: total }, (_, index) => {
				const messageChar = messageTilesMap.get(index);
				return {
					char:
						messageChar ||
						CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length)),
					isMessage: Boolean(messageChar),
				};
			});

			setTiles(initialTiles);
			initialTiles.forEach((tile, i) => {
				if (tile.isMessage) {
					console.log(tile);
				}
			});
		}
	}, [rows, cols]);

	// Random updates every 0.5s for non-message tiles
	useEffect(() => {
		const interval = setInterval(() => {
			setTiles((prev) => {
				if (!prev.length) return prev;
				const newTiles = [...prev];
				const total = newTiles.length;
				const count = Math.floor(total * 0.1);
				for (let i = 0; i < count; i++) {
					const idx = Math.floor(Math.random() * total);
					if (!newTiles[idx].isMessage) {
						newTiles[idx] = {
							...newTiles[idx],
							char: CHAR_SET.charAt(
								Math.floor(Math.random() * CHAR_SET.length)
							),
						};
					}
				}
				return newTiles;
			});
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${cols}, 1fr)`,
				gridTemplateRows: `repeat(${rows}, 1fr)`,
				height: "100vh",
				width: "100vw",
				overflow: "hidden",
			}}
		>
			{tiles.map((tile, i) => (
				<Tile key={i} char={tile.char} isMessage={tile.isMessage} />
			))}
		</div>
	);
}

const Tile = ({ char, isMessage }) => {
	const [isHovered, setIsHovered] = useState(false);

	const primaryStyle = {
		backgroundColor: "var(--color-primary-dark)",
		color: "#ffffff",
	};

	const secondaryStyle = {
		backgroundColor: "#ffffff",
		color: "var(--color-primary-dark)",
		fontWeight: "bold",
		fontSize: "45px",
	};
	const toggle = Number(isMessage) + Number(isHovered);
	const style = {
		fontFamily: "PPMondwest, monospace",
		fontSize: "24px",
		padding: "2px",
		lineHeight: 1,
		...(toggle % 2 ? secondaryStyle : primaryStyle),
	};

	return (
		<div
			className="flex items-center justify-center select-none transition-colors duration-200"
			style={style}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{char}
		</div>
	);
};
