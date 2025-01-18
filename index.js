import pkg from 'crypto-js';
const { SHA256 } = pkg;
import { createTimeStamp } from './utils.js';

// The Block class represents a single block in the blockchain.
// Each block contains information such as the index, timestamp, data, and the previous block's hash.
class Block {
    // The index is a unique identifier for the block in the chain.
    // It is optional, but it helps track the block's position in the sequence.
    // For example: first block, second block, etc.
    // The "prevHash" field represents the hash of the previous block, linking blocks together.
    // The "data" field contains the actual data of the block, such as transactions, information, etc.
    // The "timestamp" field stores the date and time when the block was created.

    constructor(index, timestamp, data, prevHash = '') {
        this.index = index;         // The index of the block in the chain.
        this.timestamp = timestamp; // The date and time the block was created.
        this.data = data;           // The data of the block (e.g., transactions).
        this.prevHash = prevHash;   // The hash of the previous block in the chain.
        this.hash = this.calculateHash(); // The hash of the current block, calculated from its data.
    }

    // The `calculateHash()` function calculates the unique hash for the block,
    // which is based on the index, prevHash, timestamp, and data.
    // This hash is critical to ensure the block's integrity and the blockchain's security.
    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

// The Blockchain class represents the blockchain itself, which is a sequence of blocks.
class Blockchain {
    constructor() {
        // The blockchain is initialized with the "Genesis Block," which is the first block in the chain.
        // The Genesis Block is special because it has no previous block, so its `prevHash` is set to "0".
        this.chain = [this.createGenesisBlock()];
    }

    // The `createGenesisBlock()` function creates the first block in the blockchain, known as the "Genesis Block."
    // This block serves as the starting point for the entire chain.
    createGenesisBlock() {
        return new Block(
            0,               // The index of the block (the first block has index 0).
            createTimeStamp(), // The timestamp indicating when the block was created.
            "Genesis block",  // The data of the block (here a generic message).
            "0"               // The previous block's hash (null for the Genesis Block).
        );
    }

    // The `getLatestBlock()` function returns the last block in the blockchain.
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // The `addBlock()` function adds a new block to the blockchain.
    // The new block gets the `prevHash` from the last block in the chain,
    // and the block's hash is recalculated to maintain the chain's integrity.
    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash; // Link the new block to the previous one.
        newBlock.hash = newBlock.calculateHash();       // Recalculate the hash for the new block.
        this.chain.push(newBlock);                      // Add the new block to the blockchain.
    }

    // The `isChainValid()` function checks the validity of the blockchain.
    // It verifies two things for each block:
    // 1. Whether the current block's hash is valid, i.e., it matches the recalculated hash.
    // 2. Whether the current block's `prevHash` matches the previous block's hash.
    // If either of these conditions fails, the blockchain is compromised and returns `false`.
    isChainValid() {
        // Start from the second block (index 1) to compare with the previous block.
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];           // The current block.
            const previousBlock = this.chain[i - 1];      // The previous block.

            // Check if the current block's hash is valid.
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.error("Hash mismatch: " + JSON.stringify(currentBlock));
                return false;
            }

            // Check if the current block's `prevHash` matches the previous block's hash.
            if (currentBlock.prevHash !== previousBlock.hash) {
                console.error("Prev hash mismatch: " + JSON.stringify(currentBlock));
                return false;
            }
        }

        // If all checks pass, the blockchain is valid.
        return true;
    }
}

// Create the blockchain "poppiCoin" and add some blocks.
let poppiCoin = new Blockchain();

// Add blocks to the chain.
poppiCoin.addBlock(new Block(1, createTimeStamp(), { amount: 4 }));
poppiCoin.addBlock(new Block(2, createTimeStamp(), { amount: 8 }));
poppiCoin.addBlock(new Block(3, createTimeStamp(), { amount: 10 }));

// Check if the blockchain is valid.
console.log("Is blockchain valid? " + poppiCoin.isChainValid());

// Simulate tampering with a block by modifying its data (change the amount).
// Note: Modifying data in an intermediate block will invalidate the blockchain,
// but modifying the last block may not invalidate it unless the `prevHash` is updated correctly.
poppiCoin.chain[1].data = { amount: 100 };         // Modify the data of block 1.
poppiCoin.chain[1].hash = poppiCoin.chain[1].calculateHash(); // Recalculate the hash of block 1.

// Check if the blockchain is valid after the modification.
console.log("Is blockchain valid after modification? " + poppiCoin.isChainValid());

// The blockchain is now invalid because the block's hash has been altered, but the links between blocks were not updated.

console.log("Poppicoin:", JSON.stringify(poppiCoin, null, 4))