const { generateExpenseReport } = require('../services/pdf-service.js');
const { uploadToS3 } = require('../services/S3-service.js');

const DownloadExpenseReport = async (req, res) => {
  try {
    //if (!req.user.isPremium) return res.status(403).send('Upgrade to premium');

    const expenses = await Expense.find({ userId: req.userId });
    const filename = `report-${req.user.id}-${Date.now()}.pdf`;
    const filepath = `/tmp/${filename}`;

    generateExpenseReport(expenses, filepath);

    uploadToS3(filepath, filename, (err, url) => {
        if (err) return res.status(500).send('Upload failed');
        res.status(200).json({ 
            message: 'successfully created expense report',
            success:true,
            downloadUrl: url });
    });
  } catch (error) {
    return res.status(500).json({
        message:'failed to create expense report',
        success:false,
        downloadUrl:'url not available at the moment'
    })
  }
}

module.exports = {
    DownloadExpenseReport
}