import express from 'express';
import {pool} from '../users/db'
import { getUserbySessionTokenQ } from '../users/queries';
import { get, merge } from 'lodash';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const cookie = req.cookies['HAMNA-AUTH']; 

        if (!cookie) {
            return res.status(403).send('You are not authorized for this');
        }

        const existingUser = await pool.query(getUserbySessionTokenQ,[cookie]);

        if (existingUser.rowCount===0 ) {
            return res.status(403).send('No such user');
        }

        //const currentStudent = existingUser.rows[0].session_token;

        merge(req, {identity: existingUser.rows[0].id} );
        //console.log('Merged req:', req);
        
        return next();

    }

    catch (error) {
        console.log(error);
        res.sendStatus(404);
    }


}

export const isLoggedIn = async ( req:express.Request, res: express.Response, next:express.NextFunction ) => {
    try {


        const { id } = req.params;
        const currentUserId = get(req, 'identity') as unknown as string;
        //console.log(currentUserId);

        if (currentUserId.toString() !== id) {
            return res.status(403).send('You are not authorized to perform this action');
        }

        next();

 
    }
    catch(error){
        console.log(error);
        return res.sendStatus(403);
    }
}


