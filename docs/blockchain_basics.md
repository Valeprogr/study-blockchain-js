# Blockchain Basics Documentation

This documentation explains the core principles of blockchain technology, using a basic implementation in JavaScript. It includes the concept of blocks, the process of mining, blockchain validation, and how to prevent tampering with the chain.

---

## **Introduction**

A **blockchain** is a distributed ledger technology that securely records transactions using a sequence of blocks. Each block contains data and a unique hash. Blocks are connected through the hash of the previous block, ensuring the integrity of the data and the immutability of the chain.

In this example, we will explore the **Block** and **Blockchain** classes, demonstrating how blocks are created, mined, added to the chain, and validated.

---

## **Block Class**

The `Block` class represents a single block in the blockchain. It contains key properties such as `index`, `timestamp`, `data`, and `prevHash`. The block also calculates its unique `hash` based on these properties, and it can be mined using a **Proof of Work (PoW)** mechanism.

### **Block Constructor**

```javascript
constructor(index, timestamp, data, prevHash = '') {
    this.index = index;         // The index of the block in the chain.
    this.timestamp = timestamp; // The date and time the block was created.
    this.data = data;           // The data of the block (e.g., transactions).
    this.prevHash = prevHash;   // The hash of the previous block in the chain.
    this.hash = this.calculateHash(); // The hash of the current block, calculated from its data.
    this.nonce = 0; // The nonce is a variable used to modify the hash.
}
```

### **calculateHash()**

The `calculateHash()` function calculates a unique hash for the block by combining its `index`, `timestamp`, `data`, and `prevHash` with the `nonce`. The hash ensures the integrity of the block, and any change in the block's data will result in a different hash.

```javascript
calculateHash() {
    return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
}
```

### **mineBlock(difficulty)**

The `mineBlock()` function performs **Proof of Work** by finding a valid hash. The process involves iterating through different `nonce` values until the hash begins with a specified number of leading zeros (based on the `difficulty` parameter). The mining process ensures that creating new blocks is computationally expensive and secures the blockchain.

```javascript
mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
}
```

---

## **Blockchain Class**

The `Blockchain` class manages the entire blockchain. It initializes with a **Genesis Block** (the first block), and it provides methods for adding new blocks, validating the chain, and ensuring the integrity of the blockchain.

### **Blockchain Constructor**

```javascript
constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
}
```

### **createGenesisBlock()**

The `createGenesisBlock()` function creates the first block in the blockchain (known as the Genesis Block). The Genesis Block is unique because it doesn't have a predecessor, so its `prevHash` is set to `"0"`.

```javascript
createGenesisBlock() {
    return new Block(0, createTimeStamp(), "Genesis block", "0");
}
```

### **getLatestBlock()**

The `getLatestBlock()` function returns the most recent block in the chain.

```javascript
getLatestBlock() {
    return this.chain[this.chain.length - 1];
}
```

### **addBlock(newBlock)**

The `addBlock()` function adds a new block to the blockchain. It sets the `prevHash` of the new block to the hash of the last block, ensuring the chain remains intact. Then it mines the block and adds it to the chain.

```javascript
addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash; 
    newBlock.mineBlock(this.difficulty); 
    this.chain.push(newBlock); 
}
```

### **isChainValid()**

The `isChainValid()` function validates the blockchain. It checks two conditions for every block in the chain:
1. Whether the current block's hash matches the calculated hash.
2. Whether the current block's `prevHash` matches the previous block's hash.

If either condition fails, the blockchain is invalid.

```javascript
isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
            console.error("Hash mismatch: " + JSON.stringify(currentBlock));
            return false;
        }

        if (currentBlock.prevHash !== previousBlock.hash) {
            console.error("Prev hash mismatch: " + JSON.stringify(currentBlock));
            return false;
        }
    }
    return true;
}
```

---

## **Example: Creating and Validating a Blockchain**

```javascript
let poppiCoin = new Blockchain();

// Add blocks to the chain
console.log("Mining block : 1")
poppiCoin.addBlock(new Block(1, createTimeStamp(), { amount: 4 }));
console.log("Mining block : 2")
poppiCoin.addBlock(new Block(2, createTimeStamp(), { amount: 8 }));
console.log("Mining block : 3")
poppiCoin.addBlock(new Block(3, createTimeStamp(), { amount: 10 }));

// Check if the blockchain is valid
console.log("Is blockchain valid? " + poppiCoin.isChainValid());

// Simulate tampering with a block by modifying its data
poppiCoin.chain[1].data = { amount: 100 }; 
poppiCoin.chain[1].hash = poppiCoin.chain[1].calculateHash(); 

// Check if the blockchain is valid after modification
console.log("Is blockchain valid after modification? " + poppiCoin.isChainValid());
```

### **Expected Output:**

- After adding the blocks, the blockchain will be valid.
- After modifying the data in one of the blocks (block 1), the blockchain will become invalid since the block's hash is altered, but the link to the previous block was not updated.

---

## **Conclusion**

This implementation demonstrates the following core principles of blockchain:

- **Block Integrity**: Each block contains a unique hash, and modifying any block alters its hash, invalidating the chain.
- **Proof of Work**: The mining process requires computational effort to secure the blockchain by finding a valid hash.
- **Blockchain Security**: The integrity of the blockchain is maintained by verifying each block's hash and the continuity of the chain.