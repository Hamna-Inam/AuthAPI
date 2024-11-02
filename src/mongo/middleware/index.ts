import express, { NextFunction } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken} from '../users/users';


export const isAuthenticated = async ( req: express.Request, res: express.Response, next: express.NextFunction )=> {

    try {
        const sessionToken = req.cookies['HAMNA-AUTH']; // cookie

        if (!sessionToken) {
            return res.status(403).send('You are not authorized for this');
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        
        if (!existingUser) {
            return res.status(403).send('No such user');
        }

        merge (req, { identity: existingUser});
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

 }

 export const isOwner = async( req:express.Request, res: express.Response, next:NextFunction) => {
    try {

        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;
        console.log(currentUserId);

        if (currentUserId.toString() !== id) {
            return res.status(403).send('You are not authorized to perform this action');
        }

        next();

    } 
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
 }

