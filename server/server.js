require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require("./src/config/db.config.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
connectDB();


app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use('/api/users', require('./src/routes/user.routes.js'));
app.use('/api/items', require('./src/routes/item.routes.js'));


let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});