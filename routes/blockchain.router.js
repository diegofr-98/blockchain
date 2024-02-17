import controllers from '../controllers/blockchain.controller.js';
import { Router } from 'express';

const router = Router();

export default function () {
   /**
    * @swagger
    * /api/get-chain:
    *   get:
    *     summary: Get the full blockchain
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 chain:
    *                   type: array
    *                   items:
    *                     type: object
    *                 length:
    *                   type: integer
    */
   router.get('/get-chain', controllers.getChain);
   /**
    * @swagger
    * /api/mine-block:
    *   get:
    *     summary: Mine a new block
    *     responses:
    *       201:
    *         description: Block mined successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                 index:
    *                   type: integer
    *                 timestamp:
    *                   type: string
    *                 proof:
    *                   type: integer
    *                 previousHash:
    *                   type: string
    */
   router.get('/mine-block', controllers.mineBlock);
   /**
    * @swagger
    * /api/is-valid-chain:
    *   get:
    *     summary: Check if the blockchain is valid
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    */
   router.get('/is-valid-chain', controllers.isValidChain);

   return router;
}