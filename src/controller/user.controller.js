const User = require('../models/user.model')
const bcrypt = require('bcrypt');

async function userRegistrationController(req, res) {
  res.render("registration", { title: "registration page" });
}

async function userRegistrationPostController(req, res, next) {
    try {
      const { firstName, lastName, email, mobileNumber, password, confirmPassword } = req.body;

      console.log(firstName, lastName, email, mobileNumber, password, confirmPassword, "check");
  
      // Simple validation
      if (!firstName || !lastName || !email || !mobileNumber || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Password matching validation
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        mobileNumber,
        password: hashedPassword,
        confirmPassword: hashedPassword, // Note: Confirm password is not typically stored, this is just for demonstration
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Redirect or respond as needed
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle any errors
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

async function userLoginGetController(req, res) {
    res.render("login", { title: "login page" });
}

async function userLoginPostController(req, res) {
    try {
        const { email, password } = req.body;
    
        // Simple validation
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
        }
    
        // Check if the user exists in the database
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // User authenticated successfully
        // You can generate a token here if you are using JWT for authentication
    
        // res.status(200).json({ message: 'Login successful' });
        res.redirect('/index.html');
      } catch (error) {
        // Handle any errors
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
}

module.exports = {userRegistrationController, userRegistrationPostController, userLoginGetController, userLoginPostController}
