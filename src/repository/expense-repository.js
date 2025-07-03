const db = require('../models/index.js');
const Expense = db.expenses;

class ExpenseRepository {

     async create(data, options) {
        try {
            const expense = await Expense.create(data, options);
            return expense;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async destroy(Id) {
        try {
            const expense = await Expense.destroy({
                where:{id : Id}
            });
            return true;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getAllExpenses(userid, offset, limit) {
        try {
            console.log('this is the offset', offset, limit);
            const expenses = await Expense.findAndCountAll({
                where : {userId : userid},
                limit: limit,
                offset: offset,
                order: [['createdAt', 'DESC']]
            });
            return expenses;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }
}

module.exports = {
    ExpenseRepository
}