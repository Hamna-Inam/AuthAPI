import express from 'express';
import {  register , login , logOut} from '../controllers';
import { getUsers, updateUser, deleteUser } from '../controllers/users';
//import { login } from 'controllers';
import { isAuthenticated, isLoggedIn } from '../middleware';

export const routerpg = express.Router();

routerpg.get('/users',isAuthenticated,getUsers);
routerpg.post('/auth/register',register);
routerpg.post('/auth/login',login);
routerpg.patch('/users/:id',isAuthenticated,isLoggedIn,updateUser);
routerpg.delete('/users/:id',isAuthenticated,isLoggedIn,deleteUser);
routerpg.get('/logout/:id',isAuthenticated,isLoggedIn,logOut);
