import express from 'express'

import { createUser, getUserByEmail, deleteUserByUsername } from '../users/users';
import { authentication, random } from '../../helpers/index';


export const register = async ( req : express.Request ,res: express.Response ) => {

    try{
        const {email, password,username} = req.body;    //const email = req.body.email;
                                                        //const password = req.body.password;
                                                        //const username = req.body.username;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if ( existingUser ) {
            return res.status(400).send('User with this username already exists');
        }


        const salt = random();

        const hashedPassword = authentication(salt,password);
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password:hashedPassword, //password set as the password entered by user in req.body
            },
        });

        return res.status(200).json(user);
        
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};


 export const login = async ( req: express.Request, res: express.Response ) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password ){
            return res.status(400).send('enter email/password');
        }
        const user_to_login = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user_to_login) {
            return res.status(400).send('User with this email does not exist');
        }

        if (user_to_login.authentication && user_to_login.authentication?.salt) {


        const expectedHash = authentication(user_to_login.authentication.salt, password);

        if ( user_to_login.authentication.password !== expectedHash){
           return res.status(403).send('Incorrect password');

        } 

        const salt = random();
        user_to_login.authentication.sessionToken = authentication(salt,user_to_login._id.toString());

        await user_to_login.save(); // this line saves any changes made to the user object, including updating the session token.

        res.cookie('HAMNA-AUTH', user_to_login.authentication.sessionToken, {domain: 'localhost',path: '/'});
            // cookie is the sessionToken but is named 'hamna-auth'
        return res.status(200).json(user_to_login).end();
    }

    } catch(error) {
        console.log(error);
        return res.status(400).send('Error logging in');

    }

    
 };

 export const logOut = async ( req:express.Request, res: express.Response ) => {
    res.clearCookie('HAMNA-AUTH', { domain: 'localhost', path: '/' });
    return res.status(200).send('You are successfully logged out');
 }
