import express from "express";

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('AHA');
});

app.listen(port, () => {
    console.log(`Listening on https://127.0.0.1:${port}`);
});