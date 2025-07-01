const { ExpenseRepository } = require('../repository/expense-repository.js');
const { UserService } = require('../services/user-service.js');
const userService = new UserService();

class ExpenseService {

    constructor() {
        this.expenseService = new ExpenseRepository();
    }

     async create(data) {
        try {
            const expense = await this.expenseService.create(data);
            let totalExpense =+ expense.amount;
            await userService.update(totalExpense, expense.userId); 
            return expense;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async destroy(Id) {
        try {
            const expense = await this.expenseService.destroy(Id);
            return true;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getAllExpenses(id) {
        try {
            const expenses = await this.expenseService.getAllExpenses(id);
            return expenses;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getAllExpensesForLeaderboard() {
        try {
            const expenses = await this.expenseService.getAllExpensesForLeaderboard();
            return expenses;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }
}

module.exports = {
    ExpenseService
}