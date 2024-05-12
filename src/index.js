import {connectDB} from './db/index.js'
import dotenv from 'dotenv'
import { app } from "./app.js"

dotenv.config({
    path: "./config.env"
})


connectDB().then(() => {
    app.on('error', (err) => {
        console.log("ERROR::",err)
        throw err;
    }
    )
}).catch(error => {
    console.log('MongoDB Connection Failed::', error)
})


const PORT = process.env.PORT || 8000
const server =  app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`)
    })