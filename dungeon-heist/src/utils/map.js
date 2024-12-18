export const TILES = {
	// OpenAGI (Glass/steel modern campus)
	OA1: "OPENAGI_MAIN_TOWER",
	OA2: "OPENAGI_RESEARCH_LABS",
	OA3: "OPENAGI_SERVER_FARM",
	OAP: "OPENAGI_PLAZA",

	// Gogool (Colorful tech campus)
	G1: "GOGOOL_DOME",
	G2: "GOGOOL_OFFICES",
	G3: "GOGOOL_LABS",
	GP: "GOGOOL_PARK",

	// XAGI (Industrial complex)
	X1: "XAGI_FACTORY",
	X2: "XAGI_ROBOTICS",
	X3: "XAGI_TESTING",
	XP: "XAGI_PLAZA",

	// Beta (Minimalist design)
	B1: "BETA_TOWER",
	B2: "BETA_LABS",
	B3: "BETA_SERVERS",
	BP: "BETA_PLAZA",

	// City Features
	H1: "HIGHWAY_NS",
	H2: "HIGHWAY_EW",
	H3: "HIGHWAY_CROSS",
	CT: "CHINATOWN",
	CG: "CITY_GENERAL",
	PK: "PARK",
	BR: "BRIDGE", // Golden bridge
	PI: "PIER",
	WA: "WATER",
};

export const cityMatrix = [];

let G2_tiles = [
    [0, 2], [1, 3], [2, 1], [2, 3], [1, 4], [0, 4], [3, 2], [0, 1], [2, 2], 
    [3, 1], [1, 2], [3, 3], [0, 3], [2, 4]
];
let G3_tiles = [
    [0, 1], [1, 1], [2, 0], [3, 1], [0, 3], [3, 3], [1, 0], [2, 1], [1, 2], 
    [0, 2], [1, 3], [3, 2], [2, 3], [1, 4]
];
let GP_tiles = [
    [2, 2], [1, 5], [0, 5], [3, 0], [4, 2], [3, 4], [2, 4], [1, 4], [3, 3], 
    [0, 4], [4, 3], [2, 5], [4, 4], [2, 1]
];

let B2_tiles = [
    [16, 2], [17, 3], [18, 2], [16, 3], [18, 3], [17, 4], [16, 4], [18, 4], [17, 1], 
    [15, 2], [19, 3], [15, 3], [16, 5], [17, 5]
];
let B3_tiles = [
    [18, 1], [16, 1], [17, 0], [16, 0], [18, 0], [19, 2], [15, 2], [19, 3], [15, 3], 
    [16, 2], [18, 3], [17, 2], [19, 4], [15, 4]
];
let BP_tiles = [
    [17, 5], [18, 5], [16, 5], [19, 4], [15, 4], [17, 6], [16, 6], [18, 6], [15, 5], 
    [18, 7], [16, 7], [17, 4], [15, 6], [19, 5]
];

let X2_tiles = [
    [2, 21], [3, 22], [1, 22], [3, 21], [2, 23], [1, 23], [3, 23], [4, 22], [0, 22], 
    [2, 20], [3, 20], [4, 21], [5, 22], [1, 21]
];
let X3_tiles = [
    [3, 20], [2, 20], [4, 20], [1, 20], [3, 19], [4, 19], [2, 19], [1, 19], [5, 21], 
    [3, 18], [2, 18], [4, 18], [1, 18], [5, 20]
];
let XP_tiles = [
    [4, 23], [5, 23], [3, 24], [2, 24], [1, 24], [3, 25], [4, 25], [2, 25], [5, 24], 
    [4, 26], [3, 27], [5, 25], [1, 23], [6, 24]
];

let OA2_tiles = [
    [16, 22], [17, 23], [18, 22], [16, 23], [18, 23], [17, 24], [16, 24], [18, 24], [17, 21], 
    [15, 22], [19, 22], [15, 23], [19, 23], [17, 25]
];
let OA3_tiles = [
    [18, 21], [16, 21], [17, 20], [16, 20], [18, 20], [19, 22], [15, 22], [19, 23], [15, 23], 
    [16, 22], [18, 23], [17, 19], [16, 19], [18, 19]
];
let OAP_tiles = [
    [17, 25], [18, 25], [16, 25], [19, 24], [15, 24], [17, 26], [16, 26], [18, 26], [15, 25], 
    [19, 25], [16, 27], [18, 27], [17, 24], [15, 26]
];



// Initialize the matrix with 20 rows and 25 columns, filled with "CG"
for (let i = 0; i < 20; i++) {
    cityMatrix[i] = []; // Initialize the row as an empty array
    for (let j = 0; j < 25; j++) {
        if ((Math.abs(i-19) + Math.abs(j-12)) < 5) {
            cityMatrix[i][j] = "PK";
        }
        else if ((i+j) === 10 || (i+j) === 11 || (i>2 && j>2 && (i+j)==12)) {
            cityMatrix[i][j] = "WA";
        }
		else if ((Math.abs(i-6) + Math.abs(j-12)) < 4){
			cityMatrix[i][j]="CT";
		}

		else if (G2_tiles.some(([x, y]) => x === i && y === j )) {
            cityMatrix[i][j] = "G2";
        } else if (G3_tiles.some(([x, y]) => x === i && y === j)) {
            cityMatrix[i][j] = "G3";
        } else if (GP_tiles.some(([x, y]) => x === i && y === j)) {
            cityMatrix[i][j] = "GP";
		}

		else if (G2_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "G2";
		} else if (G3_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "G3";
		} else if (GP_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "GP";
			
		} else if (B2_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "B2";
		} else if (B3_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "B3";
		} else if (BP_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "BP";

		} else if (X2_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "X2";
		} else if (X3_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "X3";
		} else if (XP_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "XP";

		} else if (OA2_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "OA2";
		} else if (OA3_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "OA3";
		} else if (OAP_tiles.some(([x, y]) => x === i && y === j)) {
			cityMatrix[i][j] = "OAP";
		}
		
        else {
            cityMatrix[i][j] = "CG"; // Fill each tile with "CG"
        }
    }
}


cityMatrix[1][2] = "G1";
cityMatrix[2][22] = "X1";
cityMatrix[17][2] = "B1";
cityMatrix[17][22] = "OA1";

