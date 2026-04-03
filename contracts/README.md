# Sepolia Faucet Treasury

This directory contains the Smart Contract code for the Faucet Treasury.

## Deploying the Treasury
To make the faucet operational on the blockchain, you will need to deploy `FaucetTreasury.sol` to the Sepolia Testnet. The easiest way to do this without writing deployment scripts is using Remix.

1. Go to [Remix IDE](https://remix.ethereum.org/).
2. Create a new file called `FaucetTreasury.sol` and paste the contents of `contracts/FaucetTreasury.sol` into it.
3. Compile the contract using the Solidity Compiler plugin (version ^0.8.20).
4. Go to the "Deploy & Run Transactions" tab:
   - Select **Injected Provider - MetaMask** in the Environment dropdown.
   - Ensure your MetaMask is connected to the **Sepolia** network.
   - Enter your desired `claimAmount` (in Wei) in the Deploy input parameters (e.g., `500000000000000000` for 0.5 ETH).
   - Click **Deploy** and sign the transaction.
5. Once deployed, fund the contract by sending Sepolia ETH directly to the contract address.
6. Finally, update the React frontend (inside `FaucetRequest.jsx`) with the deployed Contract Address and its ABI to call the `requestTokens()` function natively!
