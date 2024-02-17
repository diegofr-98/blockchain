import { BlockchainError, ValidationError } from '../errors/errors.js';

export default function handleErrors(err, req, res, next) {
    if (err instanceof BlockchainError || err instanceof ValidationError) {
        res.status(400).json({ error: err.message });
    } else {
        console.log(res)
        res.status(500).json({ error: 'Internal server error' });
    }
    next();
}