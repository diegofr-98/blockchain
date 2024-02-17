import express from 'express';
import handleErrors from './middleware/handle-errors.js';
import blockchainRouter from './routes/blockchain.router.js';

const app = express();
app.use(express.json());
app.use(handleErrors);

app.use('/api/blockchain', blockchainRouter());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
