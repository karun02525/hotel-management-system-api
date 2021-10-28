import {Product} from '../models'
import {productValidation} from '../validations'


const productController = {



    //Create Product
    async createProduct(req,res,next){

      const { error } = productValidation.validate(req.body);
      if (error) {
        return next(error);
      }
       res.json({mess:'haaa',data:req.body})
    },



    async findOneProduct(req,res,next){
      res.json({mess:'haaa'})
    }

};


export default productController;