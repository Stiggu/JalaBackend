import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Board from "./board.model";
import Player from "../player";
import {GameOutcome} from "../chess_types";

@Entity()
export default class Game {
    
    @PrimaryGeneratedColumn()
    public id!: number

    @OneToOne(() => Board)
    @JoinColumn()
    public board!: Board;
    
    public players: Player[] = [];
    private gameOutcome!: GameOutcome;
    private started: boolean = false;

}