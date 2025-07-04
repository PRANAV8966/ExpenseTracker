const db = require('../models/index.js');
const User = db.users;


class UserRepository {

     async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getUser(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const user = await User.destroy({
                where:{id : id}
            });
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getAllUser() {
        try {
            const users = await User.findAll({
                attributes: ['name', 'totalExpense'],
                order: [['totalExpense', 'DESC']]
            });
            return users;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async signIn(Email) {
        try {
            const user = await User.findOne({
                where:{ email: Email }
            });
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async update(totalExpense, userId, options) {
        try {
            await User.update({
                totalExpense: totalExpense
            }, {
                where : {
                    id: userId
                },
                ...options
            });
            return true;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }
}

module.exports = {
    UserRepository
}