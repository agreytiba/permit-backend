const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
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

const Signature = require('./models/signatureModel');
const multer = require('multer');
const { protect } = require('./middleware/authMiddleware')

app.post('/signatures',protect, async (req, res) => {
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
app.get('/signatures/:id',protect, async (req, res) => {
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
app.put('signatures/:id',protect, async (req, res) => {
  try {
    const userId = req.params.id;
    const { signatureData } = req.body;
    console.log(req.body);
    console.log(userId);

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




app.listen(port, () => console.log(`server running in port number ${port}`));
