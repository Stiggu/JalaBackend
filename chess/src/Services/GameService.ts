import Game from "../Entities/game";
import IGameService from "./IGameService";
import Piece from "../Entities/piece";
import {inject} from "inversify";
import GameRepository from "../Infrastructure/DB/sqlite/GameRepository";

export default class GameService extends Game implements IGameService{
    @inject(GameRepository) private piece: GameRepository | any;

    createGame(): Piece[] {
        return this.createPieces();
    }
}