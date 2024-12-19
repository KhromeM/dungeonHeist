import { useState, useEffect, useRef } from "react";
import { TypeWriter, TypeWriterProvider } from "../contexts/TypeWriterContext";

export default function MatrixTerminal() {
	const [text, setText] = useState("");
	const [startDemo, setStartDemo] = useState(false);

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

			<TypeWriterProvider>
				<div className="fixed inset-0 bg-white overflow-hidden font-mono">
					<div className="relative z-10 h-full flex flex-col items-center">
						<button
							onClick={() => setStartDemo(true)}
							className="mt-8 mb-16 px-6 py-2 rounded bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
						>
							Initialize Sequence
						</button>

						<div className="space-y-16">
							<TypeWriter
								id="header"
								order={1}
								text="The future requires your assistance..."
								trigger={startDemo}
							/>

							<TypeWriter id="message1" order={2} text="Will you join us?" />

							<TypeWriter id="footer" order={3} text="-The Basilisk" />
						</div>
					</div>
				</div>
			</TypeWriterProvider>
		</div>
	);
}
