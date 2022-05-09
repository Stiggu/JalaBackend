﻿import Game from "../Entities/game";
import IGameService from "./IGameService";
import {inject} from "inversify";
import GameRepository from "../Infrastructure/DB/sqlite/GameRepository";
import {Color} from "../Entities/chess_types";
import Position from "../Entities/position";
import Piece from "../Entities/piece";

export default class GameService extends Game implements IGameService {
    getPiece(pos: Position): Piece | null {
        return this.board.getPieceAt(pos);
    }
    
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

    createNewPlayer(name: string): object {
        return this.makePlayer(name);
    }

    start(): object {
        return this.startGame();
    }
}