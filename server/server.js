const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const dbConfig = require('./config/dbConfig');

const usersRoute = require('./routes/usersRoute');

app.use('/api/users', usersRoute);

// app.post('/api/products', (req, res) => {
//     const product = req.body;
//     console.log('Product received:', product);
//     res.status(201).send(product);
// });

// app.get('/products', (req, res) => {
//     res.send({message:"how are you?"});
//     console.log('GET request to /products');
// });


port = 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});