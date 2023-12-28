// app.js
const express = require('express');
const bodyParser = require('body-parser');
// const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Define routes
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { connection } = require('./config/db');

app.use('/auth', authRoutes);
app.use('/file', fileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async(req,res) => {

    try {
       await connection 
       console.log(`Server is running on port ${PORT}`)
    } catch (error) {
      console.log(error.message)  
    }
   
  });