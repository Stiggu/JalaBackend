import Game from "./game";
import {GameStatus} from "./chess_types";

export default interface IReport{
    game: Game,
    status: GameStatus
}