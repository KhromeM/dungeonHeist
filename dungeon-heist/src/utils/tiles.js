import grassSVG from "../images/grass.svg";
import deepWaterSVG from "../images/deepwater.svg";
import snowSVG from "../images/snow.svg";
import forestSVG from "../images/forest.svg";
import mountainPNG from "../images/mountain.png";
import shallowWaterPNG from "../images/shallowwater.png";
import sandSVG from "../images/sand.svg";
import wallPNG from "../images/wall.png";
import selectedPNG from "../images/selected.png";

export const TILE_WIDTH = 60;
export const TILE_HEIGHT = TILE_WIDTH * 0.5;
export const BASE_DEPTH = 20;
export const WALL_ELEVATION = 10;

export const TERRAIN_TYPES = {
	BUILDING: {
		top: "#E8E8E8",
		right: "#CCCCCC",
		left: "#BBBBBB",
		heightMod: 1.8,
		name: "Building",
	},
	GRASS: {
		svg: grassSVG,
		topColor: "#90EE90",
		heightMod: 1,
		name: "Grass",
	},
	SAND: {
		svg: sandSVG,
		top: "#FFE7BA",
		right: "#EED8B0",
		left: "#E6C998",
		heightMod: 0.8,
		name: "Sand",
	},
	SHALLOW_WATER: {
		image: shallowWaterPNG,
		top: "#87CEEB",
		right: "#7AB8D4",
		left: "#6DA6C2",
		heightMod: 0.6,
		name: "Shallow Water",
	},
	DEEP_WATER: {
		svg: deepWaterSVG,
		top: "#4682B4",
		right: "#3B6E99",
		left: "#305B80",
		heightMod: 0.4,
		name: "Deep Water",
	},
	MOUNTAIN: {
		image: mountainPNG,
		top: "#D3D3D3",
		right: "#BEBEBE",
		left: "#A9A9A9",
		heightMod: 2,
		name: "Mountain",
	},
	SNOW: {
		svg: snowSVG,
		top: "#FFFFFF",
		right: "#F0F0F0",
		left: "#E8E8E8",
		heightMod: 1.2,
		name: "Snow",
	},
	FOREST: {
		svg: forestSVG,
		top: "#558B2F",
		right: "#467024",
		left: "#375419",
		heightMod: 1.3,
		name: "Forest",
	},
	WALL: {
		image: wallPNG,
		top: "#A9A9A9",
		right: "#8E8E8E",
		left: "#7F7F7F",
		heightMod: 2,
		name: "Wall",
	},

	// New city terrain types
	OPENAGI_MAIN_TOWER: {
		top: "#4A90E2",
		right: "#357ABD",
		left: "#2B629A",
		heightMod: 2.5,
		name: "OpenAGI Tower",
	},
	OPENAGI_RESEARCH_LABS: {
		top: "#5B9BD5",
		right: "#4A7DAC",
		left: "#3B6285",
		heightMod: 1.8,
		name: "OpenAGI Labs",
	},
	OPENAGI_SERVER_FARM: {
		top: "#7FB2E5",
		right: "#6590BA",
		left: "#4C7090",
		heightMod: 1.5,
		name: "OpenAGI Servers",
	},
	OPENAGI_PLAZA: {
		top: "#A5C6E5",
		right: "#8AA3BA",
		left: "#6F8090",
		heightMod: 1,
		name: "OpenAGI Plaza",
	},
	GOGOOL_DOME: {
		top: "#EA4335",
		right: "#C0362A",
		left: "#982B22",
		heightMod: 2,
		name: "Gogool Dome",
	},
	GOGOOL_OFFICES: {
		top: "#FBBC05",
		right: "#CA9704",
		left: "#9E7603",
		heightMod: 1.8,
		name: "Gogool Offices",
	},
	GOGOOL_LABS: {
		top: "#34A853",
		right: "#2A8643",
		left: "#216934",
		heightMod: 1.6,
		name: "Gogool Labs",
	},
	GOGOOL_PARK: {
		top: "#89D99D",
		right: "#6EB07E",
		left: "#558B62",
		heightMod: 1,
		name: "Gogool Park",
	},
	XAGI_FACTORY: {
		top: "#808080",
		right: "#666666",
		left: "#4D4D4D",
		heightMod: 2.2,
		name: "XAGI Factory",
	},
	XAGI_ROBOTICS: {
		top: "#A0A0A0",
		right: "#808080",
		left: "#666666",
		heightMod: 1.8,
		name: "XAGI Robotics",
	},
	XAGI_TESTING: {
		top: "#C0C0C0",
		right: "#999999",
		left: "#737373",
		heightMod: 1.5,
		name: "XAGI Testing",
	},
	XAGI_PLAZA: {
		top: "#D3D3D3",
		right: "#A9A9A9",
		left: "#808080",
		heightMod: 1,
		name: "XAGI Plaza",
	},
	BETA_TOWER: {
		top: "#1DA1F2",
		right: "#1781C2",
		left: "#126592",
		heightMod: 2.3,
		name: "Beta Tower",
	},
	BETA_LABS: {
		top: "#71C9F8",
		right: "#5AA0C6",
		left: "#437A94",
		heightMod: 1.7,
		name: "Beta Labs",
	},
	BETA_SERVERS: {
		top: "#AAE1FA",
		right: "#88B4C8",
		left: "#668A96",
		heightMod: 1.5,
		name: "Beta Servers",
	},
	BETA_PLAZA: {
		top: "#E1F5FE",
		right: "#B4C4CB",
		left: "#879499",
		heightMod: 1,
		name: "Beta Plaza",
	},
	HIGHWAY_NS: {
		top: "#444444",
		right: "#333333",
		left: "#222222",
		heightMod: 1.1,
		name: "Highway N-S",
	},
	HIGHWAY_EW: {
		top: "#444444",
		right: "#333333",
		left: "#222222",
		heightMod: 1.1,
		name: "Highway E-W",
	},
	HIGHWAY_CROSS: {
		top: "#444444",
		right: "#333333",
		left: "#222222",
		heightMod: 1.1,
		name: "Highway Cross",
	},
	CHINATOWN: {
		top: "#E60012",
		right: "#B8000E",
		left: "#8A000B",
		heightMod: 1.4,
		name: "Chinatown",
	},
	CITY_GENERAL: {
		top: "#B8B8B8",
		right: "#939393",
		left: "#6E6E6E",
		heightMod: 1.3,
		name: "City",
	},
	PARK: {
		top: "#228B22",
		right: "#1B6F1B",
		left: "#145314",
		heightMod: 1,
		name: "Park",
	},
	BRIDGE: {
		top: "#708090",
		right: "#5A6673",
		left: "#434D56",
		heightMod: 1.2,
		name: "Bridge",
	},
	PIER: {
		top: "#8B4513",
		right: "#6F370F",
		left: "#53290B",
		heightMod: 1.1,
		name: "Pier",
	},
	WATER: {
		top: "#4682B4",
		right: "#386890",
		left: "#2A4E6C",
		heightMod: 0.8,
		name: "Water",
	},
	SELECTED: {
		image: selectedPNG,
		top: "#A9A9A9",
		right: "#8E8E8E",
		left: "#7F7F7F",
		heightMod: 2,
		name: "Selected",
	},
};
