import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import handleErrors from './src/middleware/handle-errors.js';
import blockchainRouter from './src/routes/blockchain.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(handleErrors);

const swaggerDefinition = {
    info: {
        version: "1.0.0",
        title: "Blockchain API",
        description: "Project to learn how blockchain works",
        contact: {
            name: "Diego Franco Roy",
            email: "contacto@laultimaneurona.com",
            url: "https://laultimaneurona.com"
        },
    },
};
const swaggerDocs = swaggerJSDoc({
    swaggerDefinition,
    apis: ["./src/routes/blockchain.router.js"]
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api', blockchainRouter());
app.use('/', (req, res) => res.status(200).redirect(apiDocsPath));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
