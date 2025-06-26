const { UserRepository } = require('../repository/user-repository.js');
const bcrypt = require('bcrypt');


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

     async signIn(data) {
        try {
            const user = await this.userService.signIn(data.email);
            if (!user) {
                throw {error:'404:user not found!!'}
            }
            const status = await this.#checkPassword(data.password, user.password);
            if (status) {
                return user;
            }

            throw {error:'incorrect user details'};
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     #checkPassword(userPlainInputPassword, encryptedPassword) {
        try {
            const response = bcrypt.compareSync(userPlainInputPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log('password validation failed');
            throw error;
        }
    }
}

module.exports = {
    UserService
}