import express from 'express';
import { auth,admin } from '../middlewares';
import {productController} from '../controllers'

const adminRouter = express.Router();


adminRouter.post('/product',[auth,admin],productController.createProduct)
adminRouter.get('/product',[auth,admin],productController.findOneProduct)




export default adminRouter;