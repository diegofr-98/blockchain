import { createHash } from 'crypto';

export class Blockchain {
    constructor() {
        this.chain = [];
        this.createBlock(1, '0');
    }

    createBlock(proof, previousHash) {
        const block = {
            index: this.chain.length + 1,
            timestamp: new Date().toISOString(),
            proof: proof,
            previousHash: previousHash
        };
        this.chain.push(block);
        return block;
    }

    getPreviousBlock() {
        return this.chain[this.chain.length - 1];
    }

    proofOfWork(previousProof) {
        let newProof = 1;
        let checkProof = false;
        while (!checkProof) {
            const hashOperation = createHash('sha256').update((newProof ** 2 - previousProof ** 2).toString()).digest('hex');
            if (hashOperation.slice(0, 4) === '0000') {
                checkProof = true;
            } else {
                newProof += 1;
            }
        }
        return newProof;
    }

    hash(block) {
        const blockString = JSON.stringify(block);
        return createHash('sha256').update(blockString).digest('hex');
    }

    isChainValid(chain) {
        let previousBlock = chain[0];
        let blockIndex = 1;
        while (blockIndex < chain.length) {
            const block = chain[blockIndex];
            if (block.previousHash !== this.hash(previousBlock)) {
                return false;
            }
            const previousProof = previousBlock.proof;
            const proof = block.proof;
            const hashOperation = createHash('sha256').update((proof ** 2 - previousProof ** 2).toString()).digest('hex');
            if (hashOperation.slice(0, 4) !== '0000') {
                return false;
            }
            previousBlock = block;
            blockIndex += 1;
        }
        return true;
    }
}