const express = require('express') 
const { default: mongoose } = require('mongoose');
const cookieparser = require('cookie-parser');
const AuthRoutes = require('./routes/AuthRoute.js');
const AdminRoutes = require('./routes/AdminRoute.js');



const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.get('/', (req, res) => {
    res.send('server start!')
  })

app.use('/api/auth', AuthRoutes)
app.use('/api/admin', AdminRoutes)

// Connect to the MongoDB database
mongoose.connect(process.env.MongoURL)
  .then(() => {
    console.log("Connected successfully to the MongoDB database");
  })
  .catch((error) => {
    console.error("An error occurred while connecting to MongoDB:", error);
  });

//Server
try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
      console.error("Failed to start the server:", error);
}