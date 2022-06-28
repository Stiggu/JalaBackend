import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string

    @Column()
    alias!: string
    
    @Column({default: 0})
    attendance?: number;
}