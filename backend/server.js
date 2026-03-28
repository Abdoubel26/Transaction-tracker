import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './db/db.js'
import transactionsRouter from './routes/transaction.route.js'
import userRouter from './routes/user.route.js'


dotenv.config()

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors());

app.use('/api/transaction', transactionsRouter)
app.use('/api/user' , userRouter)

app.listen(port, () => {
    connectDB()
    console.log('Server is listening in port: ' + port)
})

