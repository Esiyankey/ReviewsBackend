require('dotenv').config();
const express = require('express');
const authRouter = require('./route/authRouter')

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        
            status: 'success',
            message: 'Hello World!'
        
    });
});

app.use(express.json());
app.use("/app/v1/auth",require(authRouter));



app.listen(process.env.APP_PORT, () => {
  console.log('Server is running on http://localhost:3040');
});