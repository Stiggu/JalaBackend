import "reflect-metadata";
import express from "express";
import bodyParser, {BodyParser} from "body-parser";
import GameService from "./Services/GameService";

const app = express();
const port = 8080;
const jsonParser = bodyParser.json();

let game = new GameService();

app.get('/api/v1/start', (req, res) => {
    res.send(game.getGameInformation());
});

app.get('/api/v1/restart', (req, res) => {
    game = new GameService();
    res.send(game.getGameInformation());
});

app.get('/api/v1/info', (req, res) => {
    res.send(game.getGameInformation());
});

app.post('/api/v1/move', jsonParser, (req, res) => {
    res.send(game.move(req.body.color));
});

app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}/api/v1/start`);
});