import express from "express"
import ProductRouter from "./router/product.routes.js"
import CartRouter from "./router/carts.routes.js"
import realtimeproducts from "./router/realtimeproducts.routes.js"
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";

const app = express()
const PORT = 8080
const product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))


app.use("/", express.static(__dirname + "/public"))


app.get("/", async (req, res) =>{
    res.render("index", {
        title: "handlebars",
    })    
})

app.get("/api/realtimeproducts", async (req, res) =>{
    res.render("realTimeProducts", {
        title: "handlebars",
        products: await product.getProducts()
    })    
})



app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)
app.use("/api/realtimeproducts", realtimeproducts)

//Socket del lado del server
const httpServer = app.listen(PORT, () =>{
    console.log(`Servidor Express ${PORT}`)
});

const socketServer = new Server(httpServer)

socketServer.on("connection", socket =>{
    console.log("Cliente conectado")

    socket.on("message", data =>{
        console.log(data)
    })
})