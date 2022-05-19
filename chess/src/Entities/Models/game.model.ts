import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
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

    @Column()
    private gameOutcome!: GameOutcome;


    public players: Player[] = [];
    private started: boolean = false;

}