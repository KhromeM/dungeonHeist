import React, { useState, useEffect } from "react";
import "../index.css";

const Sidebar = () => {
	const [time, setTime] = useState(300);
	const [isCollapsed, setIsCollapsed] = useState(true);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime === 0) {
					return 300;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
	};

	return (
		<div
			className={`fixed top-[100px] right-4 flex flex-col items-start bg-black/85 backdrop-blur-md 
      p-4 min-w-[200px] z-10 rounded-2xl transition-all duration-300
      ${isCollapsed ? "w-[200px]" : "w-[400px]"}`}
		>
			{/* Timer and Toggle Section - Always Visible */}
			<div className="w-full flex justify-between items-center mb-4">
				<div className="text-4xl font-Digitalt text-white mr-4">
					{formatTime(time)}
				</div>
				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-xl px-3 py-2 text-sm transition-colors"
				>
					{isCollapsed ? "►" : "◄"}
				</button>
			</div>

			{/* Collapsible Content */}
			<div
				className={`w-full transition-all duration-300 overflow-hidden ${
					isCollapsed ? "h-0" : "h-[calc(50vh-100px)]"
				}`}
			>
				<h2 className="text-2xl font-Digitalt text-white mb-4">
					ENTITY DETAILS:
				</h2>
				<div className="bg-[#1a1a1a] rounded-xl p-4 w-full">
					<p className="text-white/70">No entity selected</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
