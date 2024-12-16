import { useState } from "react";
import grassSVG from "../images/grass.svg";
import deepWaterSVG from "../images/deepwater.svg";
import snowSVG from "../images/snow.svg";
import forestSVG from "../images/forest.svg";
import mountainPNG from "../images/mountain.png";
import shallowWaterPNG from "../images/shallowwater.png";
import sandSVG from "../images/sand.svg";
import wallPNG from "../images/wall.png";

const TILE_WIDTH = 60;
const TILE_HEIGHT = TILE_WIDTH * 0.5;
const BASE_DEPTH = 20;
const WALL_ELEVATION = 10; // Additional elevation for wall tiles

const TERRAIN_TYPES = {
    GRASS: {
        svg: grassSVG,
        topColor: "#90EE90", // Lighter green
        heightMod: 1,
        name: "Grass",
    },
    SAND: {
        svg: sandSVG,
        top: "#FFE7BA", // Lighter sand
        right: "#EED8B0",
        left: "#E6C998",
        heightMod: 0.8,
        name: "Sand",
    },
    SHALLOW_WATER: {
        image: shallowWaterPNG,
        top: "#87CEEB", // Lighter blue
        right: "#7AB8D4",
        left: "#6DA6C2",
        heightMod: 0.6,
        name: "Shallow Water",
    },
    DEEP_WATER: {
        svg: deepWaterSVG,
        top: "#4682B4", // Lighter deep blue
        right: "#3B6E99",
        left: "#305B80",
        heightMod: 0.4,
        name: "Deep Water",
    },
    MOUNTAIN: {
        image: mountainPNG,
        top: "#D3D3D3", // Light gray
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
    HILL: {
        top: "#B8D5AA", // Lighter green
        right: "#9EBB90",
        left: "#85A177",
        heightMod: 1.5,
        name: "Hill",
    },
    FOREST: {
        svg: forestSVG,
        top: "#558B2F", // Lighter forest green
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
};

const toIso = (x, y) => ({
    x: (x - y) * (TILE_WIDTH / 2),
    y: (x + y) * (TILE_HEIGHT / 2),
});

const Tile = ({
    x,
    y,
    terrainType = "GRASS",
    isSelected,
    onHover,
    player = null, // { imageUrl: string, id: string }
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { x: isoX, y: isoY } = toIso(x, y);

    const terrain = TERRAIN_TYPES[terrainType];
    const tileDepth = BASE_DEPTH;

    const getOpacity = () => {
        if (isHovered) return 1;
        if (isSelected) return 0.85;
        return 0.95;
    };

    // Terrain types that use custom SVG or image
    const customTerrainTypes = ["GRASS", "DEEP_WATER", "SNOW", "FOREST", "SAND", "SHALLOW_WATER", "MOUNTAIN", "WALL"];

    return (
        <g
            transform={`translate(${isoX}, ${isoY})`}
            onMouseEnter={() => {
                setIsHovered(true);
                onHover?.(x, y, true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onHover?.(x, y, false);
            }}
            style={{ cursor: "pointer" }}
        >
            {/* Terrain SVG/Image for specific terrain types */}
            {customTerrainTypes.includes(terrainType) ? (
                <image
                    href={terrain.svg || terrain.image}
                    width={TILE_WIDTH}
                    height={TILE_HEIGHT * 2}
                    x={-TILE_WIDTH / 2}
                    y={terrainType === "WALL" 
                        ? -TILE_HEIGHT / 2 - WALL_ELEVATION 
                        : -TILE_HEIGHT / 2}
                    opacity={getOpacity()}
                />
            ) : (
                <>
                    {/* Right face */}
                    <path
                        d={`
                            M ${TILE_WIDTH / 2} 0 
                            L ${TILE_WIDTH / 2} ${tileDepth}
                            L 0 ${TILE_HEIGHT / 2 + tileDepth}
                            L 0 ${TILE_HEIGHT / 2}
                        `}
                        fill={terrain.right}
                        opacity={getOpacity()}
                    />

                    {/* Left face */}
                    <path
                        d={`
                            M ${-TILE_WIDTH / 2} 0
                            L ${-TILE_WIDTH / 2} ${tileDepth}
                            L 0 ${TILE_HEIGHT / 2 + tileDepth}
                            L 0 ${TILE_HEIGHT / 2}
                        `}
                        fill={terrain.left}
                        opacity={getOpacity()}
                    />

                    {/* Top face */}
                    <path
                        d={`
                            M ${-TILE_WIDTH / 2} 0
                            L 0 ${-TILE_HEIGHT / 2}
                            L ${TILE_WIDTH / 2} 0
                            L 0 ${TILE_HEIGHT / 2}
                        `}
                        fill={terrain.top}
                        opacity={getOpacity()}
                    />
                </>
            )}

            {/* Player image overlay */}
            {player && (
                <g transform={`translate(0, ${-TILE_HEIGHT / 4})`}>
                    <image
                        href={player.imgURL}
                        width={TILE_WIDTH * 0.7}
                        height={TILE_WIDTH * 0.7}
                        x={-TILE_WIDTH * 0.3}
                        y={-TILE_WIDTH * 0.3}
                        preserveAspectRatio="xMidYMid meet"
                    />
                    <text
                        x="0"
                        y="-20"
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        style={{ pointerEvents: "none" }}
                    >
                        {player.id}
                    </text>
                </g>
            )}
        </g>
    );
};

export default Tile;