const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(process.env.DATABASE_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;

