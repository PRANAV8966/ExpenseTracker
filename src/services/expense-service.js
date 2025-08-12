const { ExpenseRepository } = require('../repository/expense-repository.js');
const { UserService } = require('../services/user-service.js');

const { sequelize } = require('../models/index.js');
const userService = new UserService();

class ExpenseService {

    constructor() {
        this.expenseService = new ExpenseRepository();
    }

     async create(data) {
        const t = await sequelize.transaction();
        try {
            const expense = await this.expenseService.create(data, {transaction: t});
            const user = await userService.getUser(expense.userId, { transaction: t });

            const updatedTotal = Number(user.totalExpense) + Number(expense.amount);

            await userService.update(updatedTotal, expense.userId,
                { transaction: t}
            );
            await t.commit()
            return expense;
        } catch (error) {
            console.log('some error occured at service', error);
            await t.rollback();
            throw error;
        }
     }

     async destroy(Id) {
        try {
            const expense = await this.expenseService.destroy(Id);
            return true;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAllExpenses(id, offset, limit) {
        try {
            const expenses = await this.expenseService.getAllExpenses(id, offset, limit);
            return expenses;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAllExpensesForLeaderboard() {
        try {
            const expenses = await this.expenseService.getAllExpensesForLeaderboard();
            return expenses;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAll(userId) {
        try {
            const expenses = await this.expenseService.getAll(userId)
            return expenses;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }
}

module.exports = {
    ExpenseService
}