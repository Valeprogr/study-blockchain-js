# Blockchain Project with Node.js

This project demonstrates a basic blockchain implementation using Node.js. It showcases the creation of a blockchain with core functionalities such as adding blocks, validating chain integrity, and ensuring data security through cryptographic hash functions using the `crypto-js` library.

## Features

- **Blockchain Structure**: Each block contains essential data, a timestamp, a hash of the previous block, and its own unique hash.
- **Genesis Block**: The first block in the blockchain, known as the "Genesis Block," which has no predecessor and is created with a unique identifier.
- **Block Addition**: New blocks can be added to the blockchain, with each block containing a reference to the previous block's hash to maintain continuity.
- **Chain Integrity Check**: A function is implemented to verify the integrity of the blockchain, ensuring that no block has been tampered with and that the blocks are correctly linked.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm (Node.js Package Manager)**: npm comes bundled with Node.js.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/blockchain-nodejs.git
   cd blockchain-nodejs
   ```

2. **Install Dependencies**

   The project uses the `crypto-js` package to generate cryptographic hash values. To install this package and other dependencies, run the following command:

   ```bash
   npm install crypto-js
   ```

   This will install all required packages for the project.

---

## Usage

1. **Running the Blockchain Example**

   Once the dependencies are installed, run the `blockchain` example in your terminal:

   ```bash
   node index.js
   ```

   This will execute the code and output whether the blockchain is valid or not.

2. **Modifying Blocks**

   The script includes an example where the blockchain's integrity is tested after modifying one of the blocks. Try altering the data of a block and observe how the blockchain becomes invalid:

   ```javascript
   poppiCoin.chain[1].data = { amount: 100 };  // Modify block data
   poppiCoin.chain[1].hash = poppiCoin.chain[1].calculateHash(); // Recalculate hash
   console.log("Is blockchain valid after modification? " + poppiCoin.isChainValid());
   ```

   The blockchain will be invalidated as soon as any block is modified, which demonstrates the importance of the hash mechanism in blockchain security.

---

## Project Structure

The project consists of the following files:

- **`index.js`**: Main logic for the blockchain, including the `Block` and `Blockchain` classes. Contains code to add blocks, validate the chain, and simulate tampering.
- **`utils.js`**: Utility functions such as `createTimeStamp()` to generate timestamps for each block.
- **`README.md`**: Documentation for the project, which you are currently reading.

---

## Example Code

### Creating a Blockchain

The `index.js` file creates a new blockchain and adds three blocks to it:

```javascript
let poppiCoin = new Blockchain();

poppiCoin.addBlock(new Block(1, createTimeStamp(), { amount: 4 }));
poppiCoin.addBlock(new Block(2, createTimeStamp(), { amount: 8 }));
poppiCoin.addBlock(new Block(3, createTimeStamp(), { amount: 10 }));

console.log("Is blockchain valid? " + poppiCoin.isChainValid());
```

### Testing Blockchain Integrity

After adding blocks, you can check the validity of the blockchain:

```javascript
poppiCoin.chain[1].data = { amount: 100 };  // Modify the block data
poppiCoin.chain[1].hash = poppiCoin.chain[1].calculateHash(); // Recalculate hash

console.log("Is blockchain valid after modification? " + poppiCoin.isChainValid());
```

In this case, modifying the block data will break the blockchain's validity, demonstrating the immutability and security of the blockchain.

---

## Troubleshooting

If you encounter any issues during installation or while running the code:

1. Check if Node.js and npm are installed correctly:

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

This project provides a simple but effective demonstration of blockchain technology using Node.js. It covers fundamental concepts such as hashing, block chaining, and chain validation. The code can be extended to implement features like **mining**, **proof-of-work**, or even **transactions** to build a more advanced blockchain network.

--- 

## Future Enhancements

- **Proof of Work (PoW)**: Implement a mining process that requires computational effort to add new blocks.
- **Transaction Handling**: Implement functionality for storing and processing transactions within blocks.
- **Decentralized Network**: Expand the project to support a network of nodes that communicate and validate blocks across a distributed system.

This blockchain framework is a solid foundation for exploring more advanced concepts and applications in blockchain technology.
