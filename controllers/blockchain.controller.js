import { Blockchain } from '../services/blockchain.service.js';
const blockchain = new Blockchain();

const mineBlock = async (req, res) => {
    try {        
        const previousBlock = blockchain.getPreviousBlock();
        const previousProof = previousBlock.proof;
        const proof = blockchain.proofOfWork(previousProof);
        const previousHash = blockchain.hash(previousBlock);
        const block = blockchain.createBlock(proof, previousHash);
        const response = {
            message: 'A new block has been mined',
            index: block.index,
            timestamp: block.timestamp,
            proof: block.proof,
            previousHash: block.previousHash
        };
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getChain = async (req, res) => {
    const response = {
        chain: blockchain.chain,
        length: blockchain.chain.length
    };
    res.status(200).json(response);
}
const isValidChain = async (req, res) => {
    const isValid = blockchain.isChainValid(blockchain.chain);
    if (isValid) {
        res.status(200).json({ message: ' The blockchain is valid' });
    } else {
        res.status(500).json({ message: 'The blockchain is not valid' });
    }
}

export default { mineBlock, getChain, isValidChain };