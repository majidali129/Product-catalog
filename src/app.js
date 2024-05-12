import express from 'express'
import morgan from 'morgan';

import productRouter from './routes/product.routes.js'
import categoryRouter from './routes/category.routes.js'
import bodyParser from 'body-parser';


const app = express()

// GLOBAL MIDDLEWARE

app.use(morgan('dev'))
app.use(express.json({limit: '16kb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





// ROUTE MOUNTING
app.use('/api/v1/products', productRouter)
app.use('/api/v1/categories', categoryRouter)


export {app}