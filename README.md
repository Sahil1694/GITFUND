# Decentralized Crowdfunding Platform

This project is a **voting-based decentralized crowdfunding platform** designed to support social impact projects. Built using **React for the frontend** and **Solidity for the backend**, it leverages **DAO mechanisms** to ensure secure, tamper-proof, and democratic fund allocation.

## Features

- **Create Campaigns**: Users can create campaigns with specific details like title, description, target amount, deadline, and category.
- **Donate to Campaigns**: Supporters can donate Ether to campaigns, and their contributions are securely recorded on the blockchain.
- **Voting System**: Donators can vote for campaigns in specific categories, influencing fund allocation.
- **Category Management**: Campaigns are organized into categories, making it easier to browse and support initiatives.
- **Campaign Winners**: Identify top campaigns within each category based on funds collected.

## Smart Contract Highlights

The platform's backend is powered by a Solidity smart contract with the following features:

- **Campaign Management**: Create and manage campaigns.
- **Donations**: Accept and track donations with secure Ether transfers.
- **Voting Mechanism**: Allow users to vote for campaigns they support.
- **Winner Selection**: Identify top campaigns by category.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **CSS Framework**: Tailored for responsive and user-friendly design.

### Backend
- **Solidity**: For writing the smart contract logic.
- **Ethereum Blockchain**: To ensure decentralization and security.

### Tools
- **Truffle/Hardhat**: For deploying and testing smart contracts.
- **Metamask**: For connecting and interacting with the Ethereum network.

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Metamask](https://metamask.io/) extension set up
- Access to an Ethereum test network (e.g., Spolia or Ganache)

### Frontend

1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend (Smart Contract)

1. Navigate to the smart contract directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```
4. Deploy the contract to a test network:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

## Usage

1. **Connect Wallet**: Users connect their Metamask wallet to interact with the platform.
2. **Create Campaigns**: Fill out a form to create a campaign with details like title, description, and target amount.
3. **Donate**: Browse campaigns and donate Ether to support them.
4. **Vote**: Donators automatically cast a vote for the campaign they support.
5. **View Winners**: See top campaigns by category based on funds raised.

## Smart Contract Details

### Contract: `CrowdFunding`

- **Functions**:
  - `createCampaign`: Allows users to create a campaign.
  - `donateToCampaign`: Accepts donations and casts votes.
  - `getDonators`: Retrieves the list of donators and their contributions for a campaign.
  - `getCampaigns`: Returns all campaigns.
  - `getCategories`: Returns all available categories.
  - `getWinnersByCategory`: Identifies winning campaigns by category.

### SPDX License

The project uses an **SPDX license identifier**: `UNLICENSED`.

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Submit a pull request.


## Contact

For any inquiries or feedback, please refer to the GitHub repository: [Project Repository](<github-link>)
