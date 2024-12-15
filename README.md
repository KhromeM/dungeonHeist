# DungeonHeist

## Game Concept

DungeonHeist is a Polytopia-style blockchain game that combines strategy, social engineering, and risk-reward mechanics. Players navigate a dungeon to reach treasure chests protected by powerful AI-controlled guards. Rather than engaging in direct combat (where guards are overwhelmingly powerful), players must use cunning and deception through a messaging system to distract or manipulate guards.

### Core Mechanics

- **Economic Loop**: Each player action (movement/message) costs 0.0025 ETH

  - 80% of fees are added to treasure chests
  - 20% goes to development wallet
  - Failed attempts increase the reward pool, making successful heists more valuable

- **Guard System**:

  - AI-controlled guards protect treasure
  - Overpowered in direct combat
  - Can be messaged and potentially deceived
  - Natural language interaction system
  - Dynamic patrol and response behaviors

- **Risk vs Reward**:
  - Treasure value increases over time from accumulated fees
  - Players must balance action costs against potential rewards
  - Strategic decision-making between stealth, deception, and direct approaches

## Technical Architecture

### Smart Contract Layer

- **Contract Name**: DungeonGame
- **Network**: Base Sepolia
- **Core Features**:
  - Entity-based state management (Players, Guards, Chests, Weapons)
  - Action message system with 0.0025 ETH fee per action
  - Automatic fee distribution (80% to treasure chests, 20% to dev wallet)
  - Turn-based state processing
  - Secure withdrawal mechanisms
  - Reentrancy protection

#### Entity Structure

```solidity
struct Entity {
    EntityType entityType;  // Player, Guard, Chest, Weapon
    uint8 x;               // Position X (0-15)
    uint8 y;               // Position Y (0-15)
    uint8 weapon;          // Weapon type
    Status status;         // Default, Walking, Chatting, Attacking
    uint16 hp;            // Health points
    uint256 money;        // ETH balance
    string name;          // Entity identifier
}
```

### Backend Server

#### Core Services

1. **GameStateManager**

   - Maintains current game state
   - Caches entity positions and states
   - Manages turn timers (5-minute cycles)
   - Tracks unprocessed events

2. **TurnProcessor**

   - Handles turn transitions
   - Processes accumulated actions
   - Updates global game state
   - Manages state synchronization

3. **WebSocketManager**

   - Real-time client communication
   - State broadcast system
   - Connection management

4. **Guard AI Service** (Pending Implementation)

   - Natural language processing for player messages
   - Guard behavior and response system
   - Patrol pattern management
   - Threat assessment and response
   - Memory of player interactions

5. **Economic System**
   - Fee collection and distribution
   - Treasure chest value calculation
   - Reward pool management
   - Successful heist processing

#### API Endpoints

1. **Admin Endpoints** (`/api/admin/`)

   - Game state control
   - Processing management
   - Withdrawal handling
   - Event monitoring

2. **Game Endpoints** (`/game`)
   - WebSocket connections
   - State queries
   - Event tracking

### Frontend Implementation

**Technology Stack**:

- Vite
- React
- TailwindCSS
- Framer Motion

#### Core Components

1. **IsometricGrid**

   - ✅ Dynamic tile rendering
   - ✅ Camera controls (zoom/pan)
   - ✅ Mouse interaction
   - ✅ Terrain variety
   - ⚠️ Pending: Movement controls
   - ⚠️ Pending: Action system

2. **Tile System**

   - ✅ Multiple terrain types
   - ✅ 3D isometric perspective
   - ✅ Interactive hover effects
   - ✅ Depth visualization
   - ⚠️ Pending: Pathfinding overlay

3. **Character System**
   - ✅ Multiple character sprites
   - ✅ Position rendering
   - ✅ Basic animations
   - ⚠️ Pending: Movement animations
   - ⚠️ Pending: Action visualizations

## Current Progress

### Completed Features

1. **Smart Contract**

   - Base game mechanics
   - State management
   - Fee system
   - Security measures

2. **Backend**

   - Server infrastructure
   - WebSocket setup
   - Game state management
   - Turn processing system
   - Admin controls

3. **Frontend**
   - Isometric game board
   - Terrain visualization
   - Character rendering
   - Camera controls
   - Basic interactions

### Pending Implementation

1. **Smart Contract**

   - Enhanced game mechanics
   - Additional entity types
   - Optimized gas usage
   - Emergency pause system

2. **Backend**

   - Combat resolution
   - Guard AI system
   - Enhanced game logic
   - State persistence
   - Advanced error handling

3. **Frontend**
   - Wallet connection
   - Backend integration
   - Game controls UI
   - Action system
   - Chat interface
   - Status displays

## Game Design Notes

### Guard Behavior

- Guards maintain memory of player interactions
- Each guard has unique personality traits
- Natural language processing for varied responses
- Dynamic patrol patterns based on threat assessment
- Ability to coordinate with other guards

### Player Strategy Options

1. **Stealth**: Avoid guard detection
2. **Deception**: Mislead guards through messaging
3. **Distraction**: Create diversions
4. **Cooperation**: Work with other players
5. **Direct Approach**: High risk, requires significant resources

### Economic Balance

- Initial chest values set to encourage participation
- Fee structure designed to grow reward pool over time
- Guard difficulty balanced against potential rewards
- Cost of actions vs. potential returns
- Anti-exploit mechanisms

## Development Roadmap

### Phase 1: Core Integration (Current)

1. Connect frontend to backend WebSocket
2. Implement wallet connection
3. Add basic game controls
4. Create game status UI

### Phase 2: Game Mechanics

1. Implement guard AI and messaging system
2. Create patrol and detection mechanics
3. Develop natural language interaction system
4. Implement treasure chest mechanics
5. Add combat system

### Phase 3: Enhancement

1. Improve guard AI behaviors
2. Add guard personality variations
3. Enhance messaging system
4. Implement guard memory and learning
5. Add advanced patrol patterns

## Setup Instructions

### Prerequisites

- Node.js v16+
- npm or yarn
- Base Chain RPC access
- Wallet with test ETH

### Installation

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
cd dungeonHeist
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## Technical Notes

### Contract Interaction

- Contract Address: [Base Sepolia Contract Address]
- Required Fee: 0.0025 ETH per action
- Event System: PlayerMessage, TurnProcessing, GameStateUpdated events

### State Management

- Turn Duration: 5 minutes
- Max Players: 10
- Grid Size: 16x16
- Entity Limit: ~20 total entities

### Security Considerations

- Make sure the backend is secure
- Transaction validation
