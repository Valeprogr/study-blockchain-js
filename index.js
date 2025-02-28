import pkg from 'crypto-js';
const { SHA256 } = pkg;
import { createTimeStamp } from './utils.js';


// Class representing a transaction between two addresses.
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress; // Sender's address
        this.toAddress = toAddress;   // Recipient's address
        this.amount = amount;         // Amount being transferred
    }
}

/**
 * The Block class represents a single block in the blockchain.
 * 
 * Each block contains information such as:
 * - `index`: the block's position in the blockchain,
 * - `timestamp`: when the block was created,
 * - `data`: the content of the block (e.g., transactions),
 * - `prevHash`: the hash of the previous block,
 * - `hash`: the unique identifier of the current block, computed from its contents,
 * - `nonce`: a number that is used to modify the hash during the mining process (Proof of Work).
 */
class Block {

    /**
     * Creates a new block with the given parameters.
     * 
     * @param {string} timestamp - The timestamp indicating when the block was created.
     * @param {object} transaction - The data stored in the block (e.g., transactions or messages).
     * @param {string} prevHash - The hash of the previous block (default is an empty string for the genesis block).
     */
    constructor(timestamp, transaction, prevHash = '') {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    /**
     * Calculates and returns the hash of the current block.
     * 
     * The hash is a SHA-256 cryptographic hash of the block's contents, including:
     * - `index`
     * - `prevHash`
     * - `timestamp`
     * - `transaction` (converted to a string)
     * - `nonce` (used to adjust the hash during the mining process)
     * 
     * This hash serves as a unique identifier for the block and ensures its integrity.
     * 
     * @returns {string} - The calculated hash of the current block.
     */
    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    /**
     * Performs Proof of Work (PoW) to mine a new block by finding a valid hash.
     * 
     * The mining process works by repeatedly adjusting the `nonce` and recalculating the hash until
     * the resulting hash matches the required difficulty level (a hash that starts with a certain number of zeros).
     * 
     * The difficulty is defined by the number of leading zeros required in the hash.
     * 
     * @param {number} difficulty - The required number of leading zeros in the hash to mine the block.
     * 
     * Steps:
     * 1. Extracts the first `difficulty` characters of the current hash.
     * 2. Compares them to a string of `difficulty` zeros (e.g., "0000" for difficulty = 4).
     * 3. If the hash does not meet the condition, increments the `nonce` and recalculates the hash.
     * 4. Repeats the process until a valid hash is found.
     * 5. Once a valid hash is found, the mined block's hash is logged to the console.
     * 
     * This ensures that mining a block requires computational effort, securing the blockchain.
     * 
     * @example
     * const newBlock = new Block(1, createTimeStamp(), { amount: 10 });
     * newBlock.mineBlock(4); // Mines a block with difficulty of 4 leading zeros
     */
    mineBlock(difficulty) {
        // Continuously recalculates the hash while the current hash does not have the required number of leading zeros.
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;  // Increment the nonce to alter the hash.
            this.hash = this.calculateHash();  // Recalculate the hash with the updated nonce.
        }
        // Log the successful mining of the block with the valid hash.
        console.log("Block mined: " + this.hash);
    }
}

/**
 * The Blockchain class represents the entire blockchain, which consists of an ordered list of blocks.
 * 
 * It provides methods to add blocks to the chain, validate the blockchain, and manage the overall blockchain structure.
 */
class Blockchain {
    /**
     * Initializes the blockchain with the first block (the Genesis Block) and sets the difficulty for mining.
     */
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; // Difficulty level for mining
        this.pendingTransaction = []; // Store transactions before mining
        this.miningReward = 100; // Reward for mining a new block
    }

    /**
     * Creates the Genesis Block, which is the first block in the blockchain.
     * The Genesis Block does not have any predecessor, so its `prevHash` is set to "0".
     * 
     * @returns {Block} - The Genesis Block, which starts the blockchain.
     */
    createGenesisBlock() {
        return new Block(
            createTimeStamp(),  // Timestamp of when the block is created.
            "Genesis block",    // Data of the block (in this case, a simple message).
            "0"                 // The Genesis Block has no previous block, so the hash is "0".
        );
    }

    /**
     * Retrieves the latest block in the blockchain.
     * 
     * @returns {Block} - The most recent block in the chain.
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Mines all pending transactions and creates a new block.
     * 
     * - The block is created using all pending transactions.
     * - The block is then mined to meet the required difficulty.
     * - After mining, the block is added to the blockchain.
     * - A reward transaction is created and added to the pending transactions.
     * 
     * @param {string} miningRewardAddress - Address to receive the mining reward.
     */

    minePedingTransactions(miningRewardAddress) {
        let block = new Block(createTimeStamp(), this.pendingTransaction);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransaction = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction(transaction) {
        this.pendingTransaction.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (let block of this.chain) {
            for (let trans of block.transaction) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    /**
     * Validates the entire blockchain by ensuring that each block's hash is correct and that the chain's integrity is maintained.
     * 
     * The blockchain is considered valid if:
     * 1. Each block's hash matches the calculated hash based on its contents.
     * 2. Each block's `prevHash` correctly points to the previous block's hash.
     * 
     * @returns {boolean} - `true` if the blockchain is valid, `false` otherwise.
     * 
     * @example
     * const isValid = myBlockchain.isChainValid();
     * console.log(isValid);  // Returns `true` if the blockchain is valid, `false` if tampered with.
     */
    isChainValid() {
        // Iterate through the chain starting from the second block.
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Validate the current block's hash.
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.error("Hash mismatch: " + JSON.stringify(currentBlock));
                return false;
            }

            // Validate the link between the current block and the previous block.
            if (currentBlock.prevHash !== previousBlock.hash) {
                console.error("Prev hash mismatch: " + JSON.stringify(currentBlock));
                return false;
            }
        }
        // If all blocks are valid, return true.
        return true;
    }
}

// Create a new blockchain (poppiCoin) and add some blocks.
let poppiCoin = new Blockchain();


poppiCoin.createTransaction(new Transaction("address1", "address2", 100));
poppiCoin.createTransaction(new Transaction("address1", "address2", 200));

console.log('\n Starting the miner.');
poppiCoin.minePedingTransactions('lolle-address');
console.log("lolle-addres balance is:", poppiCoin.getBalanceOfAddress("lolle-address"));

console.log('\n Starting the miner 2.');
poppiCoin.minePedingTransactions('lolle-address');
console.log("lolle-addres balance is:", poppiCoin.getBalanceOfAddress("lolle-address"));

