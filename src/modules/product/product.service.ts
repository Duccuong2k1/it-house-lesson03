// import { nanoid } from "nanoid";
// import { nanoid } from "nanoid";
import { CrudService } from "../../base/crudService";
import { Product, ProductModel } from "./product.model";

class ProductService extends CrudService<Product> {
  constructor() {
    super(ProductModel);
  }

  // generateCode() {
  //   const code = nanoid()
  //   return code;
  // }
  generateRandomCode(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }
}

export const productService = new ProductService();
