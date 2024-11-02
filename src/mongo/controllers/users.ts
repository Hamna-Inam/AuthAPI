import express from 'express';

import { getUserById, getUsers , deleteUserByUsername} from '../users/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        const users = await getUsers();

        return res.status(200).json(users);

    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);

    }
}


export const updateUser = async ( req: express.Request, res: express.Response ) => {
    try {
        const { username } = req.body; //ask
        const { id } = req.params;

        if (!username) {
            return res.status(400).send('Enter a username');
        }

        const user = await getUserById(id);

        if ( !user ) {
            return res.status(400).send('No such user');
        }

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();

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
         return res.status(400).send(' username is required.');
     }
     const result = await deleteUserByUsername(id);
     if (result){
     return res.status(200).send('Deleted successfully');
     }
     else{
        return res.status(200).send('User with this ema');
     }
    }
    catch(error) {
     console.error('Error in deleting:', error);
     return res.status(500).send('Error in deleting');
    }
 
 };