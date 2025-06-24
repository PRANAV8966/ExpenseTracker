const { UserRepository } = require('../repository/user-repository.js');

class UserService {

    constructor() {
        this.userService =  new UserRepository();
    }

     async create(data) {
        try {
            const user = await this.userService.create(data);
            return user;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getUser(id) {
        try {
            const user = await this.userService.getUser(id);
            return user;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const user = await this.userService.destroy(id);
            return user;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAllUser() {
        try {
            const users = await this.userService.getAllUser();
            return users;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }
}

module.exports = {
    UserService
}