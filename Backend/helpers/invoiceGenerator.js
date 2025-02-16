const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateInvoice = async (order) => {
  const doc = new PDFDocument();
  const invoicePath = `./invoices/invoice-${order._id}.pdf`;
  doc.pipe(fs.createWriteStream(invoicePath));

  // Header
  doc.fontSize(25).text("Invoice", 100, 50);
  doc.fontSize(14).text(`Order ID: ${order._id}`, 100, 90);
  doc.text(`Total Amount: $${order.totalAmount}`, 100, 110);
  doc.text(`Order Date: ${new Date(order.orderDate).toLocaleString()}`, 100, 130);

  // Table Header
  doc.moveDown();
  doc.fontSize(16).text("Products", 100, 160);
  doc.fontSize(12);

  let yPos = 190;
  doc.text("Name", 100, yPos);
  doc.text("Price", 350, yPos);
  doc.text("Quantity", 420, yPos);
  doc.text("Total", 480, yPos);

  doc.moveTo(100, yPos + 15).lineTo(550, yPos + 15).stroke(); // Line separator

  // List all products in the cart
  order.cartItems.forEach((item) => {
    yPos += 30;
    doc.text(item.title, 100, yPos);
    doc.text(`$${item.price}`, 350, yPos);
    doc.text(`${item.quantity}`, 420, yPos);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 480, yPos);
  });

  // Footer
  doc.moveDown();
  doc.text(`Grand Total: $${order.totalAmount}`, 100, yPos + 50, { bold: true });

  doc.end();
  return invoicePath;
};

module.exports = { generateInvoice };