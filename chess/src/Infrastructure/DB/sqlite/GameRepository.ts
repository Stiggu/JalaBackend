import "reflect-metadata";
import { injectable } from "inversify";
import IRepository from "../../../Repository/Interfaces/IRepository";
import {Repository} from "typeorm";
import Game from "../../../Entities/Models/game.model";
import {AppDataSource} from "./data-source";

@injectable()
export default class GameRepository implements IRepository {
    
    repo: Repository<Game>
    
    constructor() {
        this.repo = AppDataSource.getRepository(Game);
    }
    
    create(item: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    find(item: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    findOne(id: number): Promise<string> {
        console.log('a');
        throw new Error("Method not implemented.");
    }
}
