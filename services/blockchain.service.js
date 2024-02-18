import { createHash } from 'crypto';

export class Block {
    constructor(index, timestamp, data, proof, previousHash = '', nonce = 0) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.proof = proof;
        this.previousHash = previousHash;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const blockString = JSON.stringify(this);
        return createHash('sha256').update(blockString).digest('hex');
    }
}

export class Blockchain {
    constructor() {
        this.chain = [this.#createGenesisBlock()];
    }

    #createGenesisBlock() {
        return new Block(1, new Date().toISOString(), 'Genesis Block', 0, '0');
    }

    #getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    #addBlock(newBlock) {
        newBlock.previousHash = this.#getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    #proofOfWork(previousProof) {
        let newProof = 0;
        while (true) {
            const hashOperation = createHash('sha256').update((newProof ** 2 - previousProof ** 2).toString()).digest('hex');
            if (hashOperation.slice(0, 4) === '0000') {
                return newProof;
            }
            newProof++;
        }
    }

    mineBlock(block) {
        const previousProof = this.#getLastBlock().proof;
        block.proof = this.#proofOfWork(previousProof);
        this.#addBlock(block);
    }

    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            const checkPreviousHash = currentBlock.previousHash !== previousBlock.hash;
            // const checkCurrentHash = currentBlock.hash !== currentBlock.calculateHash();
            if (checkPreviousHash) {
                return false;
            }
        }
        return true;
    }
}