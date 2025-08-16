const { Router } = require('express');
const router = Router();

const { createUser, getUser, getAllUser, signIn }  = require('../controllers/user-controller.js');
const { create, destroy, getAll} = require('../controllers/expense-controller.js');
const { DownloadExpenseReport } = require('../controllers/report-controller.js');
const { forgotController } =  require('../controllers/forgot-password-controller.js');
const forgot = new forgotController();

const { authenticate } = require('../middlewares/auth-middleware.js');
const { mailAuth } = require('../middlewares/mail-middleware.js');
const { ReportAuthenticate } = require('../middlewares/report-auth-middleware.js');

router.get('/getUser', getUser);
router.get('/getAllExpenses', authenticate, getAll);
router.get('/getAllUsers',authenticate, getAllUser);


router.post('/signIn', signIn);
router.post('/signUp',createUser);

router.post('/createExpense', authenticate, create);
router.post('/forgot-password.click/verifyUser',  (req, res) => forgot.checkUser(req, res));
router.post('/downloadExpenseReport', ReportAuthenticate, DownloadExpenseReport);

router.post('/forgotLink', mailAuth, (req, res) => forgot.SendMail(req, res));
router.get('/SecureUpdatePassword', (req, res) => forgot.update(req, res));


router.delete('/deleteExpense/:id', destroy);

module.exports = router;