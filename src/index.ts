import express from 'express' 
//Web framework for handling HTTP requests.
import mongoose from 'mongoose' 
// ODM (Object-Document Mapping) tool for working with MongoDB
import cookieParser from 'cookie-parser'
//Middleware for parsing cookies from incoming requests.
import bodyParser from 'body-parser'
//Middleware for parsing JSON request bodies.
import compression from 'compression'
//Middleware for compressing HTTP responses (improves performance).
import cors from 'cors' 
//Middleware for handling Cross-Origin Resource Sharing (CORS).
import {router}  from './mongo/routers'
//Handles API routes that interact with a MongoDB database.
import {routerpg } from './pg/routers'
//Handles API routes that interact with a PostgreSQL database.
import { pool } from '../src/pg/users/db'
//PostgreSQL database connection pool.
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env



const app = express();


app.use(bodyParser.json())
app.use(cookieParser());
app.use(compression());
app.use(cors({
    credentials: true,
}));


//set up mongo
const mongo_URI = process.env.MONGO_URI as string;
mongoose.connect(mongo_URI);
mongoose.connection.on('error',(err:Error)=> {  //event listener
    console.log(err)
});


app.use('/pg',routerpg); // router for postgres queries

app.use('/',router);  // router for mongodb queries


//pool.query('CREATE TABLE users(id SERIAL PRIMARY KEY ,username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), salt VARCHAR(255), sessionToken VARCHAR(255))');

const port = process.env.port || 3000;
app.listen(port, ()=> {
    console.log('Listening port '+ port);
});
