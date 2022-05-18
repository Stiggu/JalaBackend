import {GameOutcome} from "./chess_types";
import Board from "./board";
import Player from "./player";
import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

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