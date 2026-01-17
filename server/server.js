require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});



let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});