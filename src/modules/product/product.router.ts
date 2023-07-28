import { Request, Response } from "express";
import { RouterConfig } from "../../helpers/apiRouter";
import { Workbook } from "exceljs";
import { Product, ProductModel } from "./product.model";
import fs from "fs";
import logger from "../../helpers/logger";
import { productService } from "./product.service";
import { ExcelUploader } from "../../helpers/multer";

export default [
  {
    method: "get",
    path: "/product/export",
    midd: [],
    handler: async (req: Request, res: Response) => {
      // init workbook
      const wb = new Workbook();

      //  init sheet
      const ws = wb.addWorksheet("Data-product");
      // fetch data
      const data = await ProductModel.find();
      // write header

      ws.addRow(["ID", "NGAY TAO", "GIA", "TEN SAN PHAM"]);
      // WRITE DATA
      for (const i of data) {
        ws.addRow([i._id, i.createdAt, i.sellPrice, i.name]);
      }
      // write sheet type excel in header
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Data-product.xlsx"
      );
      // write file
      await wb.xlsx.write(res);
      res.end();

      // CACH 2 KHI DATA LON
      // res.send('ok');
      // try {
      //     await wb.xlsx.writeFile("tmp/Data-product.xlsx")
      // } catch (error) {
      //     console.log("download loi xuat excel",error)
      // }
    },
  },
  {
    method: "post",
    path: "/product/importFile",
    midd: [ExcelUploader.single("file")],
    handler: async (req: Request, res: Response) => {
      if (!req.file) {
        throw new Error("file is required");
      }
      try {
        // init workbook
        const wb = new Workbook();

        await wb.xlsx.readFile(req.file.path);

        // get sheet
        const ws = wb.getWorksheet("Data-product");
        // get data
        const data = ws.getSheetValues() as any[];

        // remove header
        data.splice(0, 2);
        const products: Product[] = [];
        for (const i of data) {
            console.log("id",i)
          const product = new ProductModel({
            code:productService.generateRandomCode(8),
            sellPrice: i[3],
            name: i[4],
          });
          products.push(product);
        }
        await ProductModel.insertMany(products);

        return res.send("ok");
      } catch (error) {
        console.log("Error upload file", error);
      } finally {
        fs.unlink(req.file.path, () => {
          logger.info("already remove file");
        });
      }
    },
  },
] as unknown as RouterConfig[];
