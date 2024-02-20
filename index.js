const express = require("express");

const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const PDF = require("./models/FilesModel");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

//  connect to database
connectDB();
// allow to access  data by using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(errorHandler);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/works", require("./routes/workRoutes"));
app.use("/api/safety", require("./routes/safetyRoutes"));
app.use("/api/risks", require("./routes/riskRoute"));
app.use("/api/permits", require("./routes/permitRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/approves", require("./routes/approveRoutes"));
app.use("/api/createuser", require("./routes/createUserRoutes"));

const Signature = require('./models/signatureModel');
const multer = require('multer');
const { protect } = require('./middleware/authMiddleware')

app.post('/api/signatures',protect, async (req, res) => {
  try {
    // Assuming you have access to the user's ID (replace 'userIdValue' with the actual user ID)
    const user = req.user;
    const {signatureData} =req.body
      const existSignature = await Signature.findOne({ user:req.user })
      if (existSignature) {
     
        res.status(200).json(existSignature)
      }
      else{
    // Create a new Signature document
    const newSignature = new Signature({
      signatureData: signatureData, // Store the binary data of the signature image
      user: user, 
    });
   // Save the signature data to MongoDB
   const savedSingature= await newSignature.save();
          res.status(200).json(savedSingature);
      }
 
  } catch (error) {
   console.log(error)
  
  }
});


// get signature

// Define a route to get a signature by its ID
app.get('/api/signatures/:id',protect, async (req, res) => {
  try {
    
 const userId = req.params.id;
    // Retrieve all signatures associated with the user's ID from MongoDB
    const signature = await Signature.findOne({user:userId});

    if (!signature) {
      return res.status(404).json({ error: 'Signature not found' });
    }

    // Send the signature data as a response
    // Set the appropriate content type
    res.status(200).json(signature.signatureData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching signature' });
  }
});



// Update the signature data for a specific user
app.put('api/signatures/:id',protect, async (req, res) => {
  try {
    const userId = req.params.id;
    const { signatureData } = req.body;
  


    // Find the user's signature by user ID
    const signature = await Signature.findOne({ user: userId });

    if (!signature) {
      return res.status(404).json({ error: 'Signature not found' });
    }

    // Update the signature data
    signature.signatureData = signatureData;
   const savedSingature= await signature.save();

    res.json(savedSingature.signatureData);
  } catch (error) {
    console.error( error);
    res.status(500).json({ error: 'Error updating signature' });
  }
});

// upload files
// START OF UPLOAD  PDF TO THE  DATABASE
// Configure Multer for file uploads
const upload = multer();

// API endpoint to receive and save multiple PDF files
app.post("/api/upload-pdf", upload.array("pdf", 10), async (req, res) => {
  try {
    const pdfFiles = req.files.map((file) => ({
      filename: file.originalname,
      data: file.buffer,
    }));

    const filesuploaded = await PDF.insertMany(pdfFiles);

    res.status(201).json( filesuploaded);
  } catch (error) {
    console.error("Error uploading PDFs:", error);
    res.status(500).json({ error: "Failed to upload the PDFs" });
  }
});
// END OF UPLOAD TO DATABASE

// get pdf
app.get("api/upload-pdf", async (req, res) => {
  try {
    // get maps with specefic id
    const { pdfId } = req.query;
    if (pdfId) {
      if (!pdfId) {
        return res.status(400).json({ error: "Missing pdfId parameter" });
      }

      const pdf = await PDF.findById(pdfId, "filename");
      res.json(pdf);
    } else {
      //  fetch all PDFs
      const allPDFs = await PDF.find({}, "filename");
      res.json(allPDFs);
    }
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ error: "Failed to fetch PDFs" });
  }
});

// API endpoint to get a single PDF file by ID
app.get("/api/get-pdf/:id", async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pdf.filename}`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf.data);
  } catch (error) {
    console.error("Error getting PDF:", error);
    res.status(500).json({ error: "Failed to get the PDF" });
  }
});

app.use(errorHandler);
app.listen(port, () => console.log(`server running in port number ${port}`));
