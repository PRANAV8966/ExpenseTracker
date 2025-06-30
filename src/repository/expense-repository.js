const db = require('../models/index.js');
const Expense = db.expenses;

class ExpenseRepository {

     async create(data) {
        try {
            const expense = await Expense.create(data);
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

     async getAllExpenses(userid) {
        try {
            const expenses = await Expense.findAll({
                where : {userId : userid}
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