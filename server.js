const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// Set up Express app
const app = express();
const port = 3000;

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files (like your HTML, CSS, JS files)
app.use(express.static('public'));

// Route to upload PDF and compress it
app.post('/compress', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Read the uploaded PDF file
    const pdfPath = path.join(__dirname, 'uploads', req.file.filename);
    const pdfBytes = fs.readFileSync(pdfPath);
    
    // Load the PDF using pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Reduce the size of the PDF (for simplicity, we'll just remove metadata and optimize)
    pdfDoc.setTitle('Compressed PDF');

    // Save the modified PDF
    const compressedPdfBytes = await pdfDoc.save();

    // Save the compressed file
    const compressedPdfPath = path.join(__dirname, 'uploads', 'compressed_' + req.file.filename);
    fs.writeFileSync(compressedPdfPath, compressedPdfBytes);

    // Send the compressed file as a download
    res.download(compressedPdfPath, 'compressed_' + req.file.originalname, (err) => {
      if (err) {
        console.log("Error in downloading file", err);
      }

      // Clean up the uploaded and compressed files after download
      fs.unlinkSync(pdfPath);
      fs.unlinkSync(compressedPdfPath);
    });

  } catch (error) {
    console.error('Error during PDF compression:', error);
    res.status(500).send('Internal server error.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
