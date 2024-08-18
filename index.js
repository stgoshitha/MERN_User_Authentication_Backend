const express = require('express') 
const { default: mongoose } = require('mongoose');

const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('server start!')
  })

mongoose.connect("mongodb://127.0.0.1:27017/Final_Project_DB")
  .then(() => {
    console.log("Connected successfully to the MongoDB database");
  })
  .catch((error) => {
    console.error("An error occurred while connecting to MongoDB:", error);
  });

try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
}