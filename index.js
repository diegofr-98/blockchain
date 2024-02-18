import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import handleErrors from './src/middleware/handle-errors.js';
import blockchainRouter from './src/routes/blockchain.router.js';

const app = express();
app.use(express.json());
app.use(handleErrors);

const swaggerDocs = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Blockchain API",
        },
    },
    apis: ["./src/routes/blockchain.router.js"]
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/api', blockchainRouter());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
