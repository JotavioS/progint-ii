const express = require('express');
const cors = require('cors');
const api = require('./routers/api');
const connectDB = require('./infra/db/mongodb');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(api);

const PORT = 9000;

app.listen(PORT,()=>{
    console.log("Up and Runnint at port "+PORT);
});