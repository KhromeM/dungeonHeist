# Blockchain Dungeon Crawler - Technical Design Document

## System Architecture Overview

### Components

1. Smart Contract (Ethereum Base Chain)
2. Backend Server (Node.js)
3. Frontend (React)
4. Marketing
5. Story and lore (if its just a shitty game then who cares)

## Smart Contract Design

### State Management

- Stores current game state of all entities (approximately 20 total)
- Only authorized backend can update full state
- Players can only emit action messages

### Entity Structure

```solidity
struct Entity {
    uint8 entityType;    // player/guard/chest/weapon
    uint8 x;            // position 0-9
    uint8 y;            // position 0-9
    uint8 weapon;       // weapon type enum
    uint8 status;       // status enum
    uint8 hp;          // health points
    uint256 money;     // ETH stored (in wei)
    string name;       // entity name
}
```

### Core Functions

1. Message Emission

   - Cost: 0.0025 ETH per message
   - Types: Movement, Chat, Combat
   - Emitted as blockchain events

2. Turn Processing

   - Toggle between active/processing states
   - Emit turn processing event
   - Accept state updates from backend

3. Player Registration
   - Accept join fee (0.0025 ETH)
   - Emit join event
   - Backend assigns starting position

### Fee Distribution

- 80% to treasure chests
- 20% to dev wallet
- Automatic distribution on message processing

## Backend Server Design

### Core Services

1. Game State Manager

   - Reads blockchain events
   - Processes game logic
   - Updates contract state
   - Maintains turn timer

2. Action Processor

   - Collects actions from blockchain events
   - Validates moves
   - Resolves conflicts
   - Updates positions and stats

3. Guard AI Service

   - Manages guard behaviors
   - Processes natural language interactions
   - Determines guard responses and actions
   - Updates guard positions and states

4. Combat Resolution Service

   - Processes player vs player combat
   - Processes player vs guard combat
   - Handles loot distribution
   - Updates entity stats

5. Payment Processor
   - Records successful escapes
   - Manages payout database
   - Interfaces with manual payout system

### Game Loop

1. Continuous 5-minute cycles
2. Process all actions at turn end
3. Update contract state
4. Reset for next turn

## Frontend Design

### Core Components

1. Game Map Display

   - Simple 2D grid initially
   - Click tiles for entity information
   - Basic entity representations

2. Action Interface

   - Bottom bar for game controls
   - RainbowKit wallet integration
   - Action input system

3. Game State Display
   - Turn timer
   - Player inventory/stats
   - Entity information
   - Chat interface

### Data Flow

1. Contract events -> Backend API -> Frontend
2. Player actions -> Contract -> Backend
3. Regular state updates from Backend API

## Database Design

### Payment Processing

```
Table: Payouts
- player_address: address
- amount: uint256
- timestamp: uint256
- processed: boolean
- transaction_hash: string
```

## Future Enhancements

1. Isometric map (Polytopia style)
2. Enhanced guard personalities
3. Advanced combat system
4. Improved visualizations
5. Equipment system expansion

## Technical Requirements

### Smart Contract

- Solidity ^0.8.0
- OpenZeppelin contracts for security
- Gas optimization for bulk updates

### Backend

- Node.js
- Web3.js for blockchain interaction
- Express for API
- GPT integration for guard AI

### Frontend

- React
- RainbowKit
- Ethers.js
- TypeScript

## Security Considerations

1. Smart Contract

   - Single update authority
   - Rate limiting
   - Fee validation
   - Reentrancy protection

2. Backend

   - Private key security
   - Rate limiting
   - Input validation
   - Error handling

3. Frontend
   - Transaction confirmation
   - Error handling
   - Wallet connection security

## Development Phases

### Phase 1: Core Infrastructure

1. Basic smart contract
2. Simple backend processing
3. Minimal frontend

### Phase 2: Game Mechanics

1. Guard AI implementation
2. Combat system
3. Enhanced frontend

### Phase 3: Polish

1. Visual improvements
2. UX enhancements
3. Performance optimization
