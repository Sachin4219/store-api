// async express
require('dotenv').config()
require("express-async-errors")

const express = require("express")
const app = express()

const connect = require("./db/connect")
const productsRouter = require("./routes/products")

const notFoundMiddleWare = require("./middleware/not-found")
const errorMiddleWare = require("./middleware/error-handler")

app.use(express.json())


//routes
app.get("/", (req, res)=>{
    res.send("<h1>Store API</h1><a href='/api/v1/products'>Products route</a>")
})

app.use('/api/v1/products', productsRouter)


//products route

app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

const port = process.env.PORT || 3000

const start = async() => {
    try{
        await connect(process.env.mongo_uri)
        app.listen(port, console.log("server is listening at : ",port))
    } catch(error){
        console.log(error)
    }
}
start()