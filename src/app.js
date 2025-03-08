const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");



const addSchool = require("./routes/addSchool")
const listSchools = require("./routes/listSchools")

app.use(cors());
app.use(express.json())

app.use("/", addSchool);
app.use("/", listSchools)

app.listen(process.env.PORT, ()=>{
  console.log("Successfully listeing on PORT 7777");
})