const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateInvoice = async (order) => {
  const doc = new PDFDocument();
  const invoicePath = `./invoices/invoice-${order._id}.pdf`;
  doc.pipe(fs.createWriteStream(invoicePath));

  // Add Logo (if available)
  // doc.image("logo.png", 100, 50, { width: 100 });

  // Header
  doc.fontSize(25).fillColor("#333333").text("Kashvi Creation", 100, 50);
  doc.fontSize(14).fillColor("#555555").text("Thank You for Purchasing", 100, 85);
  doc.fontSize(12).fillColor("#777777").text(`Invoice Number: ${order._id}`, 100, 115);
  doc.text(`Invoice Date: ${new Date(order.orderDate).toLocaleString()}`, 100, 135);

  // Customer Details
  doc.moveDown();
  doc.fontSize(14).fillColor("#333333").text("Customer Details", 100, 175);
  doc.fontSize(12).fillColor("#555555");
  doc.text(`Name: ${order.customerName || "N/A"}`, 100, 205);
  doc.text(`Email: ${order.customerEmail || "N/A"}`, 100, 225);
  doc.text(`Purchase Time: ${new Date(order.orderDate).toLocaleString()}`, 100, 245);

  // Table Header
  doc.moveDown();
  doc.fontSize(16).fillColor("#333333").text("Products Purchased", 100, 285);
  doc.fontSize(12);

  let yPos = 315;
  const columnGap = 20; // Space between columns
  const startX = 100; // Starting X position

  // Column Positions
  const designNoX = startX;
  const productNameX = designNoX + 100; // Adjust based on column width
  const descriptionX = productNameX + 120;
  const qtyX = descriptionX + 150;
  const priceX = qtyX + 50;
  const totalX = priceX + 50;

  // Draw Table Header
  doc.fillColor("#333333").text("Design No", designNoX, yPos);
  doc.text("Product Name", productNameX, yPos);
  doc.text("Description", descriptionX, yPos);
  doc.text("Qty", qtyX, yPos);
  doc.text("Price", priceX, yPos);
  doc.text("Total", totalX, yPos);

  doc.moveTo(startX, yPos + 15).lineTo(totalX + 50, yPos + 15).stroke(); // Line separator

  // List all products in the cart
  order.cartItems.forEach((item) => {
    yPos += 30;

    // Design No (Product ID)
    doc.fillColor("#555555").text(item.productId || "N/A", designNoX, yPos, { width: 100, align: "left" });

    // Product Name
    doc.text(item.title || "N/A", productNameX, yPos, { width: 120, align: "left" });

    // Product Description (with text wrapping)
    doc.text(item.description || "N/A", descriptionX, yPos, { width: 150, align: "left" });

    // Quantity
    doc.text(`${item.quantity}`, qtyX, yPos, { width: 50, align: "right" });

    // Price
    doc.text(`$${item.price}`, priceX, yPos, { width: 50, align: "right" });

    // Total
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, totalX, yPos, { width: 50, align: "right" });
  });

  // Footer
  doc.moveDown();
  doc.fontSize(14).fillColor("#333333").text(`Grand Total: $${order.totalAmount}`, startX, yPos + 50, { bold: true });
  doc.fontSize(12).fillColor("#555555").text(`Payment Method: ${order.paymentMethod || "N/A"}`, startX, yPos + 80);

  // Company Contact Information
  doc.moveDown();
  doc.fontSize(12).fillColor("#333333").text("Kashvi Creation", startX, yPos + 120);
  doc.fillColor("#555555").text("Contact: +91 1234567890", startX, yPos + 140);
  doc.text("Email: support@kashvicreation.com", startX, yPos + 160);
  doc.text("Address: 123 Main Street, City, Country", startX, yPos + 180);

  doc.end();
  return invoicePath;
};

module.exports = { generateInvoice };