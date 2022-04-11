import express from "express";

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('hey!');
});

app.listen(port, () => {
    console.log(`Listening on https://localhost:${port}`);
});