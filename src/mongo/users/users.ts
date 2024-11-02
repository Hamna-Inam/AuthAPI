import mongoose from 'mongoose'; //imports the default export (mongoose) from the 'mongoose' module

const UserSchema = new mongoose.Schema({
    username : { type: String, required: true },
    email : { type: String, required: true },
    authentication: {
        password: {type: String, required: true, select: false },
        salt: {type: String, select: false },
        sessionToken : {type: String, select: false },
    }}
);

export const User = mongoose.model('User',UserSchema); //user object

export const getUsers = () => 
    User.find(); //returns every user in the database


const getUserById = (id: string) => 
    User.findById(id);


export const getUserByEmail = ( UserEmail: string ) => User.findOne( {email:UserEmail} ); //fetch user whose property email is equal to UserEmai

const deleteUserById = (id: string) => 
    User.findByIdAndDelete(id);

const deleteUserByUsername = (username: string) => User.findOneAndDelete({username:username})

const updateUserById = (id:String, values: Record<string,any>) => 
    User.findByIdAndUpdate(id,values);

export const getUserBySessionToken = (sessiontoken: string) => User.findOne({'authentication.sessionToken': sessiontoken});

//export const createUser = ( values: Record<string,any>) => new User(values).save().then((user)=>user.toObject());
export const createUser = async (values: Record<string, any>) => {
    try {
        // Create a new user instance based on the values provided
        const newUser = new User(values);

        // Save the user to the database
        await newUser.save();

        console.log('User created successfully:', newUser);
        return newUser; // Optionally return the saved user object
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
};


export { updateUserById, deleteUserById, getUserById, deleteUserByUsername}
