import Game from "../Entities/game";
import IGameService from "./IGameService";
import {inject} from "inversify";
import GameRepository from "../Infrastructure/DB/sqlite/GameRepository";
import {Color} from "../Entities/chess_types";

export default class GameService extends Game implements IGameService {
    @inject(GameRepository) private GameRep: GameRepository | any;

    getGameInformation(): object {
        return this.getGameStatus();
    }

    move(color: Color): object {
        return {
            movementInformation: this.movePiece(color),
            board: this.board
        }
    }
}