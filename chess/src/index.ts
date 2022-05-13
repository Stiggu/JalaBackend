import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import GameService from "./Services/GameService";
import Position from "./Entities/position";

const app = express();
const port = 8080;
const jsonParser = bodyParser.json();

let game = new GameService();

app.get('/api/v1/start', (req, res) => {
    res.send(game.start());
});

app.get('/api/v1/restart', (req, res) => {
    game = new GameService();
    res.send({status: 'Game has been restarted!'});
});

app.get('/api/v1/info', (req, res) => {
    res.send(game.getGameInformation());
});

app.post('/api/v1/join', jsonParser, (req, res) => {
    res.send(game.createNewPlayer(req.body.name));
});

app.post('/api/v1/move', jsonParser, (req, res) => {
    const from = new Position(req.body.from.file, req.body.from.rank);
    const to = new Position(req.body.to.file, req.body.to.rank)
    res.send(game.move(req.body.color, from, to));
});

app.post('/api/v1/piece', jsonParser, (req, res) => {
    const pos = new Position(req.body.file,req.body.rank);
    res.send(game.getPiece(pos));
});

app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}/api/v1/start`);
});