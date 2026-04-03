// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FaucetTreasury
 * @dev A simple Faucet Treasury that dispenses Sepolia ETH to users. 
 * Users can only claim once every 24 hours. The treasury must be funded by the owner.
 */
contract FaucetTreasury {
    address public owner;
    uint256 public claimAmount;
    uint256 public cooldownTime = 1 days;

    mapping(address => uint256) public lastClaimTime;

    event TokensClaimed(address indexed to, uint256 amount);
    event TreasuryFunded(address indexed from, uint256 amount);
    event ClaimAmountUpdated(uint256 newAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _claimAmount) {
        owner = msg.sender;
        claimAmount = _claimAmount;
    }

    // Allow the contract to receive ETH
    receive() external payable {
        emit TreasuryFunded(msg.sender, msg.value);
    }

    /**
     * @dev Users call this function to claim tokens from the treasury
     */
    function requestTokens() external {
        require(address(this).balance >= claimAmount, "Treasury: Insufficient funds in the faucet");
        require(block.timestamp >= lastClaimTime[msg.sender] + cooldownTime, "Treasury: You must wait 24 hours between claims");

        // Update last claim time before transfers to prevent re-entrancy
        lastClaimTime[msg.sender] = block.timestamp;

        (bool success, ) = msg.sender.call{value: claimAmount}("");
        require(success, "Treasury: Failed to send ETH");

        emit TokensClaimed(msg.sender, claimAmount);
    }

    /**
     * @dev Owner can update the amount given out per claim
     */
    function setClaimAmount(uint256 _newAmount) external onlyOwner {
        claimAmount = _newAmount;
        emit ClaimAmountUpdated(_newAmount);
    }

    /**
     * @dev Owner can withdraw all funds from the treasury if needed
     */
    function withdrawAll() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Treasury: Failed to withdraw ETH");
    }
}
