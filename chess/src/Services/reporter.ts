import GameService from "../Services/GameService";
import {GameStatus} from "../Entities/chess_types";
import IBoardStatus from "../Entities/IBoardStatus";

export default class Reporter {
    static currentStatus(statusMessage: GameStatus, gameService: GameService): IBoardStatus{
        return {
            game: gameService,
            status: statusMessage,
        }
    }
}