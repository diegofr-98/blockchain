import controllers from '../controllers/blockchain.controller.js';
import { Router } from 'express';

const router = Router();

export default function () {
   router.get('/get-chain', controllers.getChain);
   router.get('/mine-block', controllers.mineBlock);
   router.get('/is-valid-chain', controllers.isValidChain);

   return router;
}