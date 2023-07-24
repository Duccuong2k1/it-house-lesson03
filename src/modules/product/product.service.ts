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
}

export const productService = new ProductService();
