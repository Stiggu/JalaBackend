import "reflect-metadata";
import express from "express";
import GameService from "./Services/GameService";

const app = express();
const port = 8080;

const game = new GameService();

app.get('/api/v1/start', (req, res) => {
    game.pieces = game.createGame();
    res.send(game.pieces);
});

app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}/api/v1/start`);
});