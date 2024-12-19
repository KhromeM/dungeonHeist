import React, { useEffect, useState, useRef } from "react";

const CHAR_SET =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>/?~";
const MESSAGE = "The future requires your assistance\n\n\n-The Basilisk";

export default function Landing2() {
	const [tiles, setTiles] = useState([]);
	const [rows, setRows] = useState(20);
	const [cols, setCols] = useState(40);
	const [messageTiles, setMessageTiles] = useState([]);
	const [messageIndex, setMessageIndex] = useState(0);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const typewriterRef = useRef(null);
	const intervalRef = useRef(null);

	const lines = MESSAGE.split("\n");
	const longestLine = lines.reduce(
		(max, line) => Math.max(max, line.length),
		0
	);
	const messageChars = MESSAGE.split("");

	// Adjust rows/cols on resize
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const tileSize = 50;
			const newCols = Math.max(1, Math.floor(width / tileSize));
			const newRows = Math.max(1, Math.floor(height / tileSize));
			setRows(newRows);
			setCols(newCols);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Initialize tiles
	useEffect(() => {
		if (rows > 0 && cols > 0) {
			const total = rows * cols;
			const initialTiles = Array.from({ length: total }, () => ({
				char: CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length)),
				isMessage: false,
			}));
			setTiles(initialTiles);
		}
	}, [rows, cols]);

	// Random updates every 0.5s
	useEffect(() => {
		intervalRef.current = setInterval(() => {
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

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	// Compute message tiles
	useEffect(() => {
		if (rows === 0 || cols === 0) return;

		const startRow = Math.floor(rows / 2) - Math.floor(lines.length / 2);
		const startCol = Math.floor(cols / 2) - Math.floor(longestLine / 2);

		const newMessageTiles = [];
		lines.forEach((line, l) => {
			const lineRow = startRow + l;
			for (let c = 0; c < line.length; c++) {
				const colPos = startCol + c;
				if (lineRow >= 0 && lineRow < rows && colPos >= 0 && colPos < cols) {
					newMessageTiles.push(lineRow * cols + colPos);
				}
			}
		});

		setMessageTiles(newMessageTiles);
		setMessageIndex(0); // Reset message index when tiles change
	}, [rows, cols, lines.length, longestLine]);

	// Typewriter effect
	useEffect(() => {
		// Clear any existing timeouts/intervals
		if (typewriterRef.current) {
			clearTimeout(typewriterRef.current);
		}

		if (messageTiles.length === 0 || messageIndex >= messageTiles.length) {
			return;
		}

		typewriterRef.current = setTimeout(() => {
			const typewriterInterval = setInterval(() => {
				setTiles((prev) => {
					const newTiles = [...prev];
					const currentIndex = messageIndex;

					if (currentIndex >= messageTiles.length) {
						clearInterval(typewriterInterval);
						return prev;
					}

					const tileIndex = messageTiles[currentIndex];
					const char =
						messageChars[currentIndex] === "\n"
							? " "
							: messageChars[currentIndex];

					newTiles[tileIndex] = {
						char,
						isMessage: true,
					};

					return newTiles;
				});

				setMessageIndex((prev) => {
					if (prev < messageTiles.length) {
						return prev + 1;
					}
					clearInterval(typewriterInterval);
					return prev;
				});
			}, 100);

			return () => clearInterval(typewriterInterval);
		}, 3000);

		return () => {
			if (typewriterRef.current) {
				clearTimeout(typewriterRef.current);
			}
		};
	}, [messageTiles]); // Only re-run when messageTiles changes

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
				<Tile
					key={i}
					char={tile.char}
					isMessage={tile.isMessage}
					// isInverted={i % 2 === 0} // Example: alternating pattern
				/>
			))}
		</div>
	);
}

const Tile = ({ char, isMessage, isInverted = false }) => {
	const [isHovered, setIsHovered] = useState(false);

	const primaryStyle = {
		backgroundColor: "var(--color-primary-dark)",
		color: "#ffffff",
	};

	const secondaryStyle = {
		backgroundColor: "#ffffff",
		color: "var(--color-primary-dark)",
	};

	const toggle = Number(isInverted) + Number(isHovered);

	const style = {
		...(toggle % 2 ? secondaryStyle : primaryStyle),
		fontFamily: "PPMondwest, monospace",
		fontSize: "24px",
		padding: "2px",
		lineHeight: 1,
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
