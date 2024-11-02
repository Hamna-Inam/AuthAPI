import express from 'express';
import { pool } from '../users/db';

import { random , authentication } from '../../helpers'
import { Query, QueryResult } from 'pg';
import {getUsersQ, getUserbyEmailQ , addUserQ, getAuthbyEmailQ, setSessionToken} from '../users/queries'
import { add } from 'lodash';



export const register = async ( req : express.Request ,res: express.Response ) => {

    try{

        const { username,email,password } = req.body;    //const email = req.body.email;
                                                        //const password = req.body.password;
                                                        //const username = req.body.username;
        if (!email || !password || !username ) {
            console.log('Missing required fields');
            return res.sendStatus(400);
        }


        const existingUser = await pool.query(getUserbyEmailQ,[email]);

        if ( existingUser.rowCount > 0 ) {
            return res.status(400).send('User with this email already exists');
        }

        
        const salt = random();

        const hashedPassword = authentication(salt,password); //generate a hashed password against the password entered by the user
        const user = await pool.query(addUserQ,[username,email,hashedPassword,salt,null]);
    
        return res.status(200).json(user.rows);
       
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};

export const login = async ( req: express.Request , res: express.Response ) => {

    try{

    const { email, password } = req.body;

    if (!email || !password  ) {
        console.log('Missing required fields');
        return res.sendStatus(400);
    }

    console.log('All values entered');

    const existingUser = await pool.query(getUserbyEmailQ,[email]);

    if ( existingUser.rowCount == 0 ) {
        return res.status(400).send('User with this email does not exist');
    }

    console.log(' User exists ');

    const details = await pool.query(getAuthbyEmailQ,[email]);

    const user_salt = details.rows[0].salt
    const hashedPassword = details.rows[0].password


    const expectedPassword = authentication(user_salt,password);

    if ( expectedPassword !== hashedPassword ) {
        return res.status(404).send('Incorrect Password');
    }

    console.log('Correct password');
    
    const salt = random();
    const session_token = authentication(salt,existingUser.rows[0].id.toString()); // a new session_token
    await pool.query(setSessionToken,[session_token,existingUser.rows[0].id]);
    res.cookie('HAMNA-AUTH',session_token,{domain: 'localhost',path: '/'});
    return res.send('Successfully logged in').status(200);


    }

catch(error){
    console.log(error);
    res.sendStatus(400);
}
};


export const logOut = async ( req:express.Request, res: express.Response ) => {
    res.clearCookie('HAMNA-AUTH', { domain: 'localhost', path: '/' });
    return res.status(200).send('You are successfully logged out');
 }

