import { Blockchain, Block } from '../services/blockchain.service.js';
const blockchain = new Blockchain();

const mineBlock = async (req, res) => {
    try {
        const data = req.body.data;
        const newBlock = new Block(
            blockchain.chain.length + 1,
            new Date().toISOString(),
            data,
            null,
        );

        blockchain.mineBlock(newBlock);
        res.status(201).json(newBlock);
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
    const isValid = blockchain.isValidChain();
    if (isValid) {
        res.status(200).json({ message: ' The blockchain is valid' });
    } else {
        res.status(500).json({ message: 'The blockchain is not valid' });
    }
}

export default { mineBlock, getChain, isValidChain };