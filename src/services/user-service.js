const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig')
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user service layer");
            throw error;
        }
    }
    async getById(userId){
        try {
            const user = await this.userRepository.getById(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user service layer");
            throw error;
        }
    }
    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY, {expiresIn : '7d'});
            return result;

        } catch (error) {
            console.log("Something went wrong in token creation in service layer");
            throw error;
        }
    }
    async signIn(email,plainPassword){
        try {
            // step 1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //  step 2-> compare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordsMatch){
                console.log("Password doesn't match");
                throw { error : 'INCORRECT PASSWORD'};
            }
            // Step 3 - if passwords match then create a token and send it to the user
            const newJWT = this.createToken({email: user.email , id: user.id});
            return newJWT;
        } catch (error) {
            console.log("something went wrong in the sign in process.");
            throw error;
        }
    }
    async isAuthenticated(token){
        try {
            const response  = this.verifyToken(token);
            if(!response){
                throw{error:'Invalid Token'}
            }
            const user = this.userRepository.getById(response.id);

            if(!user){
                throw {error:"No user with the corresponding token exists"};
            }
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }
    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token verification in service layer");
            throw error;
        }
    }
    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
        } catch (error) {
            console.log('Something went wrong in password comparison');
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service lalyer");
            throw error;
        }
    }
}
module.exports = UserService;