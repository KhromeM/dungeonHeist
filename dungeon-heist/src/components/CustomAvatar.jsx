const generateColorFromAddress = (address) => {
	const hash = address.split("").reduce((acc, char) => {
		return char.charCodeAt(0) + ((acc << 5) - acc);
	}, 0);

	const hue = hash % 360;
	return `hsl(${hue}, 70%, 50%)`;
};

export const CustomAvatar = ({ address, ensImage, size }) => {
	const color = generateColorFromAddress(address);

	return ensImage ? (
		<img
			src={ensImage}
			width={size}
			height={size}
			style={{
				borderRadius: "50%",
				objectFit: "cover",
			}}
			alt="ENS Avatar"
		/>
	) : (
		<div
			style={{
				backgroundColor: color,
				borderRadius: "50%",
				height: size,
				width: size,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "white",
				fontSize: size * 0.5,
				fontWeight: "bold",
			}}
		>
			{address ? address.slice(2, 4).toUpperCase() : "??"}
		</div>
	);
};
