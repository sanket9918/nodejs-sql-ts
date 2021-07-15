import * as dotenv from 'dotenv'
import express from 'express'
import { orderRouter } from './routes/orderRouter'
import { db } from './db'
const app = express()
dotenv.config()
// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/orders', orderRouter)

db.connect((err) => {
    if (err) {
        throw err
    }
    db.query("SELECT * FROM Customer", function (err, result, field) {
        if(err) throw console.error();
        console.log(result);
        
    })
})



app.listen(process.env.PORT, () => {
    console.log(`Node server running at ${process.env.PORT} `)
})

