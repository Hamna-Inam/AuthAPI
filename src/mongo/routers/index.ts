import express from 'express';
import { register,login, logOut } from '../controllers';
import { getAllUsers, updateUser, deleteUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';

export const router = express.Router();
router.post('/auth/register', register);
router.delete('/users/:id', isAuthenticated,isOwner ,deleteUser);
router.post('/auth/login',login);
router.get('/users',isAuthenticated,getAllUsers);
router.patch('/users/:id',isAuthenticated,isOwner,updateUser);
router.get('/logout/:id',isAuthenticated,isOwner,logOut)



/*

//import express from 'express';
import { createUser, getUserByEmail , deleteUserByUsername } from '../users/users';
import { authentication, random } from '../helpers/index';

const router = express.Router();

// Middleware function to handle registration
/*const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).send('Email, password, and username are required.');
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const salt = random();
        const hashedPassword = authentication(salt, password);

        const newUser = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: hashedPassword,
            },
        });

        // Respond with JSON data
        return res.status(200).json(newUser);
    } catch (error) {
        console.error('Error in registration:', error);
        return res.status(500).send('Internal Server Error');
    }
};


// Route definition
router.post('/auth/register', register);

router.delete('/users/:username', async (req, res) => {

   try {
    const username_to_delete = req.params.username;

    if (!username_to_delete) {
        return res.status(400).send(' username is required.');
    }
    await deleteUserByUsername(username_to_delete);
    return res.status(200).send('Deleted successfully');

   }
   catch(error) {
    console.error('Error in deleting:', error);
    return res.status(500).send('Error in deleting');
   }

});

export default router;

*/