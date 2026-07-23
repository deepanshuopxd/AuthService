const { isAdmin } = require('../controllers/user-controller');
const { User,Role} = require('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in the user repo layer");
            throw error;
        }
    }
    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    ud:userId
                }
            });
            return true;
        } catch (error) {
            console.log("something went wrong in the user repo layer");
            throw error;
        }
    }
    async getById(userId){
        try {
            const user  = await User.findByPk(userId,{
                attributes : ['email','id']
            
            });  // using select attributes
            return user;
        } catch (error) {
            console.log("something went wrong in the user repo layer");
            throw error;
        }
    }
    async getByEmail(userEmail){
        try {
            const user  = await User.findOne({
                where:{
                    email:userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("something went wrong in the user repo layer");
            throw error;
        }
    }
    // async updatePassword(userEmail){
    //     try {
    //         const user  = await User.findOne({
    //             where:{
    //                 email:userEmail
    //             }
    //         });
    //         const newPassword = 
    //     } catch (error) {
    //         console.log("There is error while updating password")
    //     }
    // }
    async isAdmin(userId){
        try {
            const user  = await User.findByPk(userId);
            const adminRole  = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("something went wrong in the user repo layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
