const IsometricPlayer = ({
	color = "#FF0000",
	size = 30,
	style = "knight",
}) => {
	const styles = {
		knight: (
			<g transform={`translate(${-size / 2}, ${-size / 2})`}>
				{/* Knight's armor */}
				<path
					d={`
			  M ${size / 2} ${size * 0.3}
			  L ${size * 0.7} ${size * 0.5}
			  L ${size / 2} ${size * 0.7}
			  L ${size * 0.3} ${size * 0.5}
			  Z
			`}
					fill="#a0a0a0"
					stroke="#707070"
					strokeWidth="1"
				/>
				{/* Helmet */}
				<path
					d={`
			  M ${size * 0.4} ${size * 0.2}
			  L ${size / 2} ${size * 0.1}
			  L ${size * 0.6} ${size * 0.2}
			  L ${size / 2} ${size * 0.3}
			  Z
			`}
					fill={color}
					stroke="#000"
					strokeWidth="1"
				/>
				{/* Plume */}
				<path
					d={`
			  M ${size / 2} ${size * 0.1}
			  Q ${size * 0.6} ${size * 0.05} ${size * 0.7} ${size * 0.15}
			`}
					fill="none"
					stroke={color}
					strokeWidth="2"
				/>
			</g>
		),

		mage: (
			<g transform={`translate(${-size / 2}, ${-size / 2})`}>
				{/* Robe */}
				<path
					d={`
			  M ${size / 2} ${size * 0.2}
			  L ${size * 0.8} ${size * 0.5}
			  L ${size / 2} ${size * 0.8}
			  L ${size * 0.2} ${size * 0.5}
			  Z
			`}
					fill={color}
					stroke="#000"
					strokeWidth="1"
				/>
				{/* Hat */}
				<path
					d={`
			  M ${size * 0.3} ${size * 0.2}
			  L ${size / 2} 0
			  L ${size * 0.7} ${size * 0.2}
			`}
					fill={color}
					stroke="#000"
					strokeWidth="1"
				/>
				{/* Staff */}
				<path
					d={`
			  M ${size * 0.7} ${size * 0.3}
			  L ${size * 0.8} ${size * 0.1}
			`}
					stroke="#8b4513"
					strokeWidth="2"
				/>
				<circle
					cx={size * 0.8}
					cy={size * 0.1}
					r={size * 0.1}
					fill="#4fc3f7"
					opacity="0.7"
				/>
			</g>
		),

		ninja: (
			<g transform={`translate(${-size / 2}, ${-size / 2})`}>
				{/* Body */}
				<path
					d={`
			  M ${size / 2} ${size * 0.2}
			  L ${size * 0.65} ${size * 0.4}
			  L ${size / 2} ${size * 0.6}
			  L ${size * 0.35} ${size * 0.4}
			  Z
			`}
					fill={color}
					stroke="#000"
					strokeWidth="1"
				/>
				{/* Mask */}
				<path
					d={`
			  M ${size * 0.4} ${size * 0.15}
			  L ${size / 2} ${size * 0.1}
			  L ${size * 0.6} ${size * 0.15}
			  L ${size / 2} ${size * 0.2}
			  Z
			`}
					fill="#333"
				/>
				{/* Scarf */}
				<path
					d={`
			  M ${size * 0.6} ${size * 0.2}
			  Q ${size * 0.8} ${size * 0.25} ${size * 0.7} ${size * 0.4}
			`}
					fill="none"
					stroke={color}
					strokeWidth="2"
				/>
			</g>
		),

		robot: (
			<g transform={`translate(${-size / 2}, ${-size / 2})`}>
				{/* Body */}
				<path
					d={`
			  M ${size * 0.3} ${size * 0.3}
			  L ${size * 0.7} ${size * 0.3}
			  L ${size * 0.7} ${size * 0.7}
			  L ${size * 0.3} ${size * 0.7}
			  Z
			`}
					fill="#dedede"
					stroke={color}
					strokeWidth="2"
				/>
				{/* Head */}
				<rect
					x={size * 0.4}
					y={size * 0.1}
					width={size * 0.2}
					height={size * 0.2}
					fill="#dedede"
					stroke={color}
					strokeWidth="2"
				/>
				{/* Eye */}
				<circle cx={size / 2} cy={size * 0.2} r={size * 0.05} fill={color} />
				{/* Antenna */}
				<line
					x1={size / 2}
					y1={size * 0.1}
					x2={size / 2}
					y2={size * 0}
					stroke={color}
					strokeWidth="2"
				/>
			</g>
		),
	};

	return styles[style] || styles.knight;
};

export default IsometricPlayer;
