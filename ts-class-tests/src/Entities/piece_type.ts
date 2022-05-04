import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PieceKind } from './chess_types';

@Entity()
export default class PieceType {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    pieceType!: PieceKind;
}