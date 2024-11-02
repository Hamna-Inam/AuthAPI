import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors' //middleware
import {router}  from './mongo/routers'

import {routerpg } from './pg/routers'
import { pool } from '../src/pg/users/db'


const app = express();


app.use(bodyParser.json())
app.use(cookieParser());
app.use(compression());
app.use(cors({
    credentials: true,
}));


//set up mongo
const mongo_URI = '--';
//mongoose.connect(mongo_URI);
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
