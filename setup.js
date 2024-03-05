// // Import necessary modules
// const bcrypt = require('bcryptjs');
// const User = require('./models/userModel'); // Assuming this is the path to your User model

// // Define a function to create a user with the name "admin"
// async function createAdminUser() {
//     try {
//         // Check if admin user already exists
//         const existingAdmin = await User.findOne({ email:'permitapptz@gmail.com' });
//         if (existingAdmin) {
//             console.log('Admin user already exists.');
//             return;
//         }

//         // Generate password hash
//         const salt = await bcrypt.genSalt(10);
//         const password = 'Admin.test@1234'; // Set your admin password here
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create the admin user
//         const adminUser = new User({
//             firstName: 'admin',
//             lastName: 'admin',
//             email: 'permitapptz@gmail.com', // Set admin email
//             phoneNumber: '1234567890', // Set admin phone number
//             password: hashedPassword,
//             userType: 'admin', // Assuming admin user type
//             isVerified: true, // Assuming admin user is already verified
//             verificationToken: '', // No need for verification token for admin
//         });

//         // Save the admin user to the database
//         await adminUser.save();

//         console.log('Admin user created successfully.');
//     } catch (error) {
//         console.error('Error creating admin user:', error);
//     }
// }

// // Call the function to create the admin user
// createAdminUser();



const bcrypt = require('bcryptjs');
require('dotenv').config({ path: __dirname + '/./.env' });

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_NAME);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
async function setupApp() {


  try {
    const User = require('./models/userModel');
    var newUser = new User();
    const salt = await bcrypt.genSalt(10);
const password = 'Admin.test@1234'; // Set your admin password here
const hashedPassword = await bcrypt.hash(password, salt);

    await  new User({
            firstName: 'admin',
            lastName: 'admin',
            email: 'permitapptz@gmail.com', 
            phoneNumber: '1234567890', 
            password: hashedPassword,
            userType: 'admin', 
            isVerified: true, 
            verificationToken: '',
    }).save();
    console.log('👍 Admin created : Done!');
  } catch (e) {
    console.log('\n🚫 Error! The Error info is below');
    console.log(e);
    process.exit();
  }
}

setupApp()