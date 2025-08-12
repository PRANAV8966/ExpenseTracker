const { generateExpenseReport } = require('../services/pdf-service.js');
const { uploadToS3 } = require('../services/S3-service.js');

const { ExpenseService } = require('../services/expense-service.js');
const expenseService = new ExpenseService();

const DownloadExpenseReport = async (req, res) => {
  try {
    //if (!req.user.isPremium) return res.status(403).send('Upgrade to premium');

    const expenses = await expenseService.getAll(req.body.userId);
    const filename = `report-${req.body.userId}-${Date.now()}.pdf`;
    const filepath = `/tmp/${filename}`;

    await generateExpenseReport(expenses, filepath);

    const url = await uploadToS3(filepath, filename); // updated
    res.status(200).json({
      message: 'Successfully created expense report',
      success: true,
      downloadUrl: url
    });
  } catch (error) {
    return res.status(500).json({
        message:'failed to create expense report',
        success:false,
        downloadUrl:'url not available at the moment',
        error:error
    })
  }
}

module.exports = {
    DownloadExpenseReport
}