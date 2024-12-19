import React, { createContext, useContext, useState, useEffect } from "react";

const TypeWriterContext = createContext(null);

export const TypeWriterProvider = ({ children }) => {
	const [activeId, setActiveId] = useState(null);
	const [sequence, setSequence] = useState([]);

	const register = (id, order) => {
		setSequence((prev) => {
			if (prev.some((item) => item.id === id)) return prev;
			const newSequence = [...prev, { id, order }];
			return newSequence.sort((a, b) => a.order - b.order);
		});
	};

	const complete = (id) => {
		const currentIndex = sequence.findIndex((item) => item.id === id);
		if (currentIndex < sequence.length - 1) {
			setActiveId(sequence[currentIndex + 1].id);
		}
	};

	const startSequence = () => {
		if (sequence.length > 0) {
			setActiveId(sequence[0].id);
		}
	};

	const resetSequence = () => {
		setActiveId(null);
	};

	return (
		<TypeWriterContext.Provider
			value={{
				activeId,
				register,
				complete,
				startSequence,
				resetSequence,
			}}
		>
			{children}
		</TypeWriterContext.Provider>
	);
};

export const TypeWriter = ({
	id,
	order = 0,
	text,
	typingSpeed = 100,
	className = "",
	style = {},
	trigger = null,
}) => {
	const [displayText, setDisplayText] = useState("");
	const [isComplete, setIsComplete] = useState(false);
	const { activeId, register, complete } = useContext(TypeWriterContext);

	useEffect(() => {
		register(id, order);
	}, [id, order]);

	useEffect(() => {
		if (activeId === id || trigger) {
			let index = 0;
			setDisplayText("");
			setIsComplete(false);

			const typeInterval = setInterval(() => {
				if (index < text.length) {
					setDisplayText(text.slice(0, index + 1));
					index++;
				} else {
					clearInterval(typeInterval);
					setIsComplete(true);
					complete(id);
				}
			}, typingSpeed);

			return () => clearInterval(typeInterval);
		}
	}, [activeId, id, text, typingSpeed, trigger]);

	if (!displayText && activeId !== id && !trigger) {
		return null;
	}

	const defaultStyle = {
		color: "#0171A9",
		WebkitTextStroke: "0.5px black",
		...style,
	};

	return (
		<pre
			className={`text-4xl whitespace-pre-wrap font-mono px-10 ${className}`}
			style={defaultStyle}
		>
			{displayText}
			{!isComplete && (
				<span
					className="inline-block w-3 h-6 ml-1 animate-pulse"
					style={{ backgroundColor: "#0171A9" }}
				/>
			)}
		</pre>
	);
};
