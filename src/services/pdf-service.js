const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateExpenseReport(expenses, filepath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filepath));

  doc.fontSize(18).text('Expense Report', { align: 'center' });
  doc.moveDown();

  expenses.forEach((expense, index) => {
    doc.fontSize(12).text(`${index + 1}. ${expense.category} - ₹${expense.amount} on ${expense.date}`);
  });

  doc.end();
}
module.exports = {
    generateExpenseReport
}