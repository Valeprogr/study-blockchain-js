**Transactions in Blockchain**

## 1. Introduction

A transaction in blockchain represents the transfer of value or data between two addresses. In a cryptocurrency, a transaction consists of transferring digital coins from a sender to a recipient.

A transaction can also involve the execution of a smart contract.

Transactions are collected in blocks and validated through the mining or validation process, depending on the consensus mechanism used by the blockchain.

---

## 2. Structure of a Transaction

A typical transaction in blockchain contains:

- **Sender address (fromAddress)**: the address sending the value.
- **Recipient address (toAddress)**: the address receiving the value.
- **Amount (amount)**: the quantity of value transferred.

Example of code to define a transaction in JavaScript:

```javascript
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
```

---

## 3. Creating and Managing Transactions

In our blockchain system, transactions are created and stored in a **pending transactions** array before being included in a block.

Example of creating a transaction and adding it to the pending transactions list:

```javascript
let poppiCoin = new Blockchain();

// Creating new transactions
poppiCoin.createTransaction(new Transaction("address1", "address2", 100));
poppiCoin.createTransaction(new Transaction("address1", "address2", 200));
```

These transactions are not yet confirmed in the blockchain but are waiting to be processed by the miner.

---

## 4. Mining Transactions

To confirm a transaction, it must be included in a block, and the block must be mined. Mining involves the Proof of Work (PoW) process, where miners compete to find a valid hash.

Example of mining pending transactions:

```javascript
console.log('\n Starting the mining...');
poppiCoin.minePedingTransactions('lolle-address');
console.log("Balance of lolle-address:", poppiCoin.getBalanceOfAddress("lolle-address"));
```

After mining, the transactions are confirmed, and the miner receives a **mining reward**.

---

## 5. Checking the Balance

After transactions have been confirmed, it is possible to check the balance of a specific address.

Example of code to get the balance of an address:

```javascript
console.log("Balance of lolle-address:", poppiCoin.getBalanceOfAddress("lolle-address"));
```

This method scans the blockchain and calculates the balance based on previous transactions.

---

## 6. Validating the Blockchain

To ensure the integrity of the blockchain, it is necessary to verify that each block contains correct data and that each transaction is valid. This is done using the **isChainValid()** method.

Example of code to validate the blockchain:

```javascript
console.log("Is the blockchain valid?", poppiCoin.isChainValid());
```

If the blockchain has been altered, the method will return `false` and report any issues.

---

## 7. Conclusion

Transactions are a fundamental element of any blockchain. They enable the transfer of value between users and are protected by security mechanisms such as cryptography and distributed consensus.

Thanks to mining and validation, the blockchain ensures that transactions are secure, immutable, and transparent.



