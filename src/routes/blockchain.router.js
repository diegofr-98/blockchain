import controllers from '../controllers/blockchain.controller.js';
import { Router } from 'express';

const router = Router();

export default function () {
   /**
    * @swagger
    * /api/blockchain:
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
   router.get('/blockchain', controllers.getChain);
   /**
    * @swagger
    * /api/mine:
    *   post:
    *     summary: Mine a new block
    *     consumes:
    *       - application/json
    *     produces:
    *       - application/json
    *     parameters:
    *          - in: body
    *            name: body
    *            schema:
    *              type: object
    *              required:
    *                  - data
    *              properties:
    *                  data:
    *                    type: string
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
   router.post('/mine', controllers.mineBlock);
   /**
    * @swagger
    * /api/is-valid:
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
   router.get('/is-valid', controllers.isValidChain);

   return router;
}