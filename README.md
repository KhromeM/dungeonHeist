# Blockchain Dungeon Crawler

A turn-based dungeon crawler game where players compete for treasure using blockchain technology. Every 5 minutes, the game processes all player moves and AI actions to create the next game state. The game resets daily with new opportunities.

## How It Works

### Core Gameplay

- Players move through a 10x10 tile-based dungeon map
- Find treasure chests containing ETH rewards
- Encounter AI-controlled guards that can be fought or persuaded
- Chat with guards using natural language to negotiate passage or alliance
- Game state updates every 5 minutes with all player actions
- Daily resets redistribute treasure and guard positions
- Players must escape with their loot to claim rewards

### Technical Stack

- Smart Contract: Polygon Network (for low fees and fast transactions)
- Backend: Node.js server processing game logic and AI conversations
- Frontend: React-based interactive game map
- Wallet: MetaMask integration for moves and rewards

### Architecture

1. **Smart Contract**

   - Records player moves as blockchain events
   - Maintains current game state on-chain (10x10 map state)
   - Manages prize pool (80% to players, 20% to devs)
   - Handles payment distribution to winners
   - Processes player action fees
   - Allows only latest move per player each turn
   - Controlled by privileged server address for updates

2. **Node.js Server**

   - Processes turns every 5 minutes
   - Manages AI guard conversations and decisions
   - Calculates combat outcomes
   - Updates game state on blockchain
   - Manages daily resets
   - Tracks player statistics and history
   - Distributes rewards to successful players

3. **React Frontend**
   - Displays 10x10 tile-based game map
   - Shows real-time player positions and equipment
   - Visualizes chest locations and guard positions
   - Manages MetaMask wallet connection
   - Displays turn timer and state updates
   - Shows player inventory and status
   - Chat interface for guard interactions

### Game Flow

1. Players submit moves through MetaMask (costs small fee in ETH)
2. Smart contract records moves and emits events
3. Every 5 minutes, server:
   - Collects all player moves
   - Processes guard interactions and combat
   - Updates game state
   - Distributes rewards
4. Daily reset creates new treasure and guard positions

### Player Guide

1. Connect MetaMask wallet with some ETH
2. Submit moves (costs small fee, converted to MATIC for gas)
3. Wait for turn processing (5 minutes)
4. Monitor map for state updates
5. Negotiate with or fight guards
6. Collect treasure
7. Exit dungeon to secure winnings

### Economic Model

- Player moves cost fees in ETH
- 80% of fees go to prize pool
- 20% of fees go to development
- Rewards distributed from prize pool
- Daily reset redistributes unclaimed rewards
