const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoutes")


app.use(cors());
app.use(express.json())

app.use('/api', schoolRoutes);

app.listen(process.env.PORT, ()=>{
  console.log("Successfully listeing on PORT 7777");
})