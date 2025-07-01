const { ExpenseService } = require('../services/expense-service.js');

const expenseController = new ExpenseService();

const create = async (req, res) => {
    try {
        const expense = await expenseController.create(req.body);
        return res.status(200).json({
            data:expense,
            success:true,
            message:'successfully created expense',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to create expense',
            error:error
        });
    }
}

const destroy = async (req, res) => {
    try {
        const expense = await expenseController.destroy(req.params.id);
        return res.status(200).json({
            data:expense,
            success:true,
            message:'successfully deleted expense',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to delete expense',
            error:error
        });
    }
}

const getAll = async (req, res) => {
    try {
        const expense = await expenseController.getAllExpenses(req.body.userId);
        
        return res.status(200).json({
            data:expense,
            success:true,
            message:'successfully fetched expenses',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch expenses',
            error:error
        });
    }
}

const getAllExpensesForLeaderboard = async (req, res) => {
    try {
        const expenses = await expenseController.getAllExpensesForLeaderboard();
        return res.status(200).json({
            data: expenses,
            success:true,
            message: 'successfully fetched all expense for leaderboard',
            error:{}
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch expenses',
            error:error
        });
    }
}

module.exports = {
    create,
    destroy,
    getAll,
    getAllExpensesForLeaderboard
}