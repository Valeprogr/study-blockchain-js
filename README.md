
# Blockchain Project with Node.js

This project demonstrates a simple implementation of a blockchain using Node.js. 
It includes the creation of a blockchain with basic functionalities such as adding blocks and validating the integrity of the chain. Additionally, it uses the `crypto-js` library to generate secure hash values for each block.

## Features:
- **Blockchain Structure**: Each block contains data, a timestamp, the hash of the previous block, and its own unique hash.
- **Genesis Block**: The first block in the blockchain, also known as the "Genesis Block," which has no previous block.
- **Block Addition**: New blocks can be added to the blockchain, with the hash of the previous block linking them.
- **Chain Integrity Check**: The blockchain has a function to verify the validity of the chain by ensuring the integrity of each block and the link between them.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm (Node.js package manager)**: npm comes with Node.js, so it will be installed automatically with Node.js.

---

## Installation

Follow the steps below to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/blockchain-nodejs.git
   cd blockchain-nodejs
   ```

2. **Install Dependencies**

   The project uses the `crypto-js` package to generate cryptographic hash values. Install it using npm:

   ```bash
   npm install crypto-js
   ```

   This will download and install all required packages for the project.

---

## Usage

1. **Running the Blockchain Example**

   After installing the dependencies, you can run the `blockchain` example in your terminal using Node.js:

   ```bash
   node index.js
   ```

   This will execute the code and output whether the blockchain is valid or not.

2. **Modifying Blocks**

   The script includes an example where the blockchain's integrity is tested after modifying a block. Try altering the data of one of the blocks to see how the chain invalidates itself.

---

## Project Structure

The project contains the following files:

- `index.js`: Contains the main code to run the blockchain, including the `Block` and `Blockchain` classes, and the logic for adding blocks and verifying the chain.
- `utils.js`: Contains utility functions such as the `createTimeStamp()` function, which generates timestamps for each block.
- `README.md`: This file, which contains documentation for the project.

---

## Example Code

### Blockchain Creation

The `index.js` file creates a new blockchain and adds three blocks to it:

```javascript
let poppiCoin = new Blockchain();

poppiCoin.addBlock(new Block(1, createTimeStamp(), { amount: 4 }));
poppiCoin.addBlock(new Block(2, createTimeStamp(), { amount: 8 }));
poppiCoin.addBlock(new Block(3, createTimeStamp(), { amount: 10 }));

console.log("Is blockchain valid? " + poppiCoin.isChainValid());
```

---

## Testing Blockchain Integrity

After adding blocks, you can test the integrity of the blockchain:

```javascript
poppiCoin.chain[1].data = { amount: 100 }; // Modify block data
poppiCoin.chain[1].hash = poppiCoin.chain[1].calculateHash(); // Recalculate hash

console.log("Is blockchain valid after modification? " + poppiCoin.isChainValid());
```

This modification will trigger the blockchain to become invalid, as the link between blocks will be broken.

---


## Troubleshooting

If you encounter any issues during installation or while running the code:

1. Ensure you have Node.js and npm installed correctly by running:
   ```bash
   node -v
   npm -v
   ```
   These commands should print the installed versions of Node.js and npm.

2. If there are issues with the installation of dependencies, try clearing npm's cache and reinstalling:
   ```bash
   npm cache clean --force
   npm install
   ```

---

## Conclusion

This project is a simple demonstration of how blockchain works in practice using Node.js. The focus is on understanding the fundamental concepts of blockchain, including hashing, linking blocks, and chain validation. You can extend this project by adding additional features such as mining, proof-of-work, or transaction handling.

---
