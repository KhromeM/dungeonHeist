import { useState, useEffect, useRef } from "react";

export default function MatrixTerminal() {
	const [text, setText] = useState("");
	const canvasRef = useRef(null);
	const message = "The future requires your assistance\n\n\n-The Basilisk";

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const resizeCanvas = () => {
			console.log("resized");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>/?~";
		const fontSize = 20;
		const lineHeight = 12;
		const columns = Math.floor(canvas.width / fontSize);
		const rows = Math.floor(canvas.height / lineHeight);

		const draw = () => {
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "#0171A930";
			ctx.font = `${fontSize}px monospace`;

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < columns; x++) {
					const char = chars[Math.floor(Math.random() * chars.length)];
					if (Math.random() < 0.01) {
						ctx.fillStyle = "#0171A930";
						ctx.fillText(char, x * fontSize, y * lineHeight);
					} else {
						ctx.fillStyle = "#0171A909";
						ctx.fillText(char, x * fontSize, y * lineHeight);
					}
				}
			}
		};

		const interval = setInterval(draw, 500);

		// Type out message
		let index = 0;
		const typeInterval = setInterval(() => {
			if (index < message.length) {
				setText(message.slice(0, index + 1));
				index++;
			} else {
				clearInterval(typeInterval);
			}
		}, 100);

		return () => {
			clearInterval(interval);
			clearInterval(typeInterval);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [canvasRef]);

	return (
		<div className="fixed inset-0 bg-white overflow-hidden font-mono">
			<canvas ref={canvasRef} className="absolute inset-0" />

			<div
				className="relative z-10 h-full flex justify-center"
				style={{ marginTop: "20%" }}
			>
				<pre
					className="text-4xl whitespace-pre-wrap font-mono px-10"
					style={{
						color: "#0171A9",
						WebkitTextStroke: "0.5px black",
					}}
				>
					{text}
					<span
						className="inline-block w-3 h-6 ml-1 animate-pulse"
						style={{ backgroundColor: "#0171A9" }}
					/>
				</pre>
			</div>
		</div>
	);
}
