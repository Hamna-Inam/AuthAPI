export const createTableQ = 'CREATE TABLE users(id SERIAL PRIMARY KEY ,username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), salt VARCHAR(255), sessionToken VARCHAR(255))'
export const deleteTableQ = ' DROP TABLE users'
export const getUsersQ = 'SELECT username, email FROM users';
export const getUserbyIdQ =  'SELECT  id, username, email FROM users WHERE id=$1';
export const getUserbyEmailQ = 'SELECT id, username, email FROM users WHERE email=$1';
export const getAuthbyEmailQ = 'SELECT salt, password FROM users WHERE email=$1';


export const addUserQ = `INSERT INTO users (username, email, password, salt, sessiontoken) VALUES ($1, $2, $3, $4, $5);`


export const setSessionToken = 'UPDATE users SET sessiontoken = $1 WHERE id=$2'

export const UpdateUserQ = 'UPDATE users SET username = $1 WHERE id=$2'

export const deleteUserQ = 'DELETE FROM users WHERE id =$1'

export const getUserbySessionTokenQ = 'SELECT id,sessiontoken FROM users WHERE sessiontoken=$1 '

//export const deleteUserQ = 'DELETE FROM users WHERE id=$1';
//export const updateUserQ = 'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *';
