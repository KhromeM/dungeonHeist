// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DungeonGame is ReentrancyGuard {

    enum EntityType { Player, Guard, Chest, Weapon }
    enum ActionType { Join, Move, Chat, Attack }
    enum Status { Default, Walking, Chatting, Attacking }

    struct Entity {
        EntityType entityType;
        uint8 x;
        uint8 y;
        uint8 weapon;
        Status status;
        uint16 hp;
        uint256 money;
        string name;
    }

    struct EntityWithAddress {
        address addr;
        Entity entity;
    }

    // State variables
    EntityWithAddress[] public entities;
    address public backend;
    bool public isProcessing = false;
    uint256 public constant PLAYER_FEE = 0.0025 ether;
    address public devWallet;
    uint8 public currentPlayers;
    uint8 public constant MAX_PLAYERS = 10;
    
    event PlayerMessage(
        address indexed player,
        ActionType actionType,
        bytes data,
        uint256 timestamp
    );
    
    event Withdraw(address indexed to, uint256 amount, uint256 timestamp);
    event TurnProcessing(uint256 timestamp, bool isProcessing);
    event GameStateUpdated(uint256 timestamp);
    event FeeDistributed(uint256 toChests, uint256 toDev);

    modifier onlyBackend() {
        require(msg.sender == backend, "Only backend can call this");
        _;
    }

    modifier notProcessing() {
        require(!isProcessing, "Game is processing turn");
        _;
    }

    constructor() {
        devWallet = msg.sender;
        backend = msg.sender;
        currentPlayers = 0;
    }

    function submitMessage(ActionType actionType, bytes calldata data) 
        external 
        payable 
        notProcessing 
    {
        require(msg.value >= PLAYER_FEE, "Incorrect fee amount");
        
        // Check player limit for join actions
        if (actionType == ActionType.Join) {
            require(currentPlayers < MAX_PLAYERS, "Game is full");
            currentPlayers += 1;
        }
        
        uint256 toChests = (PLAYER_FEE * 80) / 100;
        uint256 toDev = PLAYER_FEE - toChests;

        emit FeeDistributed(toChests, toDev);
        
        emit PlayerMessage(
            msg.sender,
            actionType,
            data,
            block.timestamp
        );
    }

    function startTurnProcessing() external onlyBackend {
        isProcessing = true;
        emit TurnProcessing(block.timestamp, isProcessing);
    }

    function stopTurnProcessing() external onlyBackend {
        isProcessing = false;
        emit TurnProcessing(block.timestamp,isProcessing);
    }

    function updateGameState(
        EntityWithAddress[] calldata newEntities,
        uint8 alivePlayers
    ) external onlyBackend {
        delete entities;
        
        for(uint i = 0; i < newEntities.length; i++) {
            entities.push(newEntities[i]);
        }
        
        currentPlayers = alivePlayers;
        
        emit GameStateUpdated(block.timestamp);
    }

    function getGameState() 
        external 
        view 
        returns (EntityWithAddress[] memory) 
    {
        return entities;
    }

    function withdraw(uint256 amount, address to) external onlyBackend {
        require(amount <= address(this).balance, "Insufficient contract balance");
        (bool success, ) = to.call{value: amount}("");
        require(success, "Withdrawal failed");
        emit Withdraw(to, amount, block.timestamp);

    }

    receive() external payable {}
}