import IBoardStatus from "./IBoardStatus";
import {GameStatus} from "./chess_types";
import Game from "./game";
import IReport from "./IReport";

export default class Reporter {
    static currentStatus(statusMessage: GameStatus, game: Game): IBoardStatus{
        return {
            game: game,
            status: statusMessage,
        }
    }
}