import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js"

const realTimeProducts = Router()
const products = new ProductManager()

realTimeProducts.get("/", async (req, res) =>{
    res.send(await products.getProducts())
});

export default realTimeProducts;