require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        
            status: 'success',
            message: 'Hello World!'
        
    });
});



app.listen(process.env.APP_PORT, () => {
  console.log('Server is running on http://localhost:3040');
});