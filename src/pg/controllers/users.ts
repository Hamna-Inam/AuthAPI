import express from 'express';
import { pool } from '../users/db';
import {getUsersQ, getUserbyIdQ, UpdateUserQ, deleteUserQ} from '../users/queries'

export const getUsers =  async (req: express.Request, res:express.Response ) => {
    try {
        const result = await pool.query(getUsersQ);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


export const updateUser = async ( req: express.Request, res: express.Response ) => {
    try {
        const { username } = req.body; 
        const { id } = req.params;

        if (!username) {
            return res.status(400).send('Enter a username');
        }

        const user = await pool.query(getUserbyIdQ,[id]);

        if ( user.rowCount == 0 )
            return res.send('User with this id does not exist');
        
        await pool.query(UpdateUserQ,[username,id]);

        return res.send('User updated successfully').status(200);

    }
 
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {

    try {
     const id = req.params.id;
 
     if (!id) {
         return res.status(400).send('id is required');
     }

     const user = await pool.query(getUserbyIdQ,[id]);
     if(user.rowCount == 0){
     return res.status(200).send('User with this id does not exist');
     }

     await pool.query(deleteUserQ,[id]);
     return res.status(200).send('Deleted successfully');
 
    }
    catch(error) {
     console.error('Error in deleting:', error);
     return res.status(500).send('Error in deleting');
    }
 
 };

