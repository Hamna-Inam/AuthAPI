import crypto from 'crypto'

const SECRET = 'HAMNA-REST-API';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => { // function that performs authentication
    return crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex');
}
 // function that performs authentication
    
