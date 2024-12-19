import React, { useEffect, useState } from "react";

const CHAR_SET =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>/?~";

const MESSAGE = "The future requires your assistance\n\n-The Basilisk";
const VERTICAL_START_RATIO = 0.2;

// Wrap a single line of text into multiple lines based on cols
function wrapSingleLine(line, cols) {
	if (line.trim() === "") {
		return [""];
	}

	const words = line.split(" ");
	const wrappedLines = [];
	let currentLine = [];
	let currentLength = 0;

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const wordLength = word.length;
		if (currentLine.length === 0) {
			currentLine.push(word);
			currentLength = wordLength;
		} else {
			if (currentLength + 1 + wordLength <= cols) {
				currentLine.push(word);
				currentLength += 1 + wordLength;
			} else {
				wrappedLines.push(currentLine.join(" "));
				currentLine = [word];
				currentLength = wordLength;
			}
		}
	}

	if (currentLine.length > 0) {
		wrappedLines.push(currentLine.join(" "));
	}

	return wrappedLines;
}

// Wrap the entire message (which may include newlines) into lines that fit the given cols
function wrapMessageIntoLines(message, cols) {
	const segments = message.split("\n");
	let finalLines = [];

	for (let i = 0; i < segments.length; i++) {
		const segment = segments[i];
		const wrapped = wrapSingleLine(segment, cols);
		finalLines = finalLines.concat(wrapped);
	}

	return finalLines;
}

function calculateMessageTiles(rows, cols, lines) {
	const longestLine = lines.reduce(
		(max, line) => Math.max(max, line.length),
		0
	);
	const startRow = Math.floor(rows * VERTICAL_START_RATIO);
	const startCol = Math.max(0, Math.floor((cols - longestLine) / 2));

	const messageTilesMap = new Map();
	lines.forEach((line, lineIndex) => {
		const currentRow = startRow + lineIndex;
		for (let charIndex = 0; charIndex < line.length; charIndex++) {
			const currentCol = startCol + charIndex;
			if (
				currentRow >= 0 &&
				currentRow < rows &&
				currentCol >= 0 &&
				currentCol < cols
			) {
				const index = currentRow * cols + currentCol;
				messageTilesMap.set(index, line[charIndex]);
			}
		}
	});

	return messageTilesMap;
}

export default function Landing2() {
	const [tiles, setTiles] = useState([]);
	const [rows, setRows] = useState(20);
	const [cols, setCols] = useState(40);
	const [tileSize, setTileSize] = useState(20);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			// Calculate tileSize as width * 0.025
			let newTileSize;
			if (width < 600) {
				newTileSize = width * 0.075; // fewer chars per line
			} else if (width < 1200) {
				newTileSize = width * 0.04; // medium
			} else {
				newTileSize = width * 0.025; // more chars per line
			}
			const newCols = Math.max(1, Math.ceil(width / newTileSize));
			const newRows = Math.max(1, Math.ceil(height / newTileSize));
			setTileSize(newTileSize);
			setRows(newRows);
			setCols(newCols);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (rows > 0 && cols > 0) {
			const lines = wrapMessageIntoLines(MESSAGE, cols);
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
		}
	}, [rows, cols]);

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
				gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
				gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
				height: `${rows * tileSize}px`,
				width: `${cols * tileSize}px`,
				overflow: "hidden",
				margin: "0 auto", // center horizontally if there's extra space
			}}
		>
			{tiles.map((tile, i) => (
				<Tile
					key={i}
					char={tile.char}
					isMessage={tile.isMessage}
					tileSize={tileSize}
				/>
			))}
		</div>
	);
}

const Tile = ({ char, isMessage, tileSize }) => {
	const [isHovered, setIsHovered] = useState(false);

	const primaryStyle = {
		backgroundColor: "var(--color-primary-dark)",
		color: "#ffffff",
	};

	const secondaryStyle = {
		backgroundColor: "#ffffff",
		color: "var(--color-primary-dark)",
		fontWeight: "bold",
		fontSize: "40px",
	};

	const toggle = Number(isMessage) + Number(isHovered);
	const style = {
		fontFamily: "PPMondwest, monospace",
		fontSize: "24px",
		padding: "2px",
		lineHeight: 1,
		...(toggle % 2 ? secondaryStyle : primaryStyle),
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	};

	return (
		<div
			className={`flex items-center justify-center select-none transition-colors duration-200`}
			style={style}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{char}
		</div>
	);
};
