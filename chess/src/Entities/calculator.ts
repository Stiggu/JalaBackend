import Position from "./position";
import {fileHelper, fileMapper, fileMapperReverse} from "./fileMapper";
import {RANK_OFFSET} from "./chess_globals";
import {File} from "./chess_types";

export default class Calculator {
    public fromFile: number;
    public toFile: number;
    public distanceX: number; 
    public distanceY: number;
    public directionX: number;
    public directionY: number;
    
    
    constructor(private fromPosition: Position, private toPosition: Position ) {
        [this.fromFile, this.toFile] = Calculator.fileToMatrix(fromPosition, toPosition);
        [this.distanceX, this.distanceY] = this.calculateDistance(fromPosition, toPosition);
        [this.directionX, this.directionY] = this.calculateDirection(fromPosition, toPosition);
    }

    static fileToMatrix(...filePosition: Position[]): number[] {
        return filePosition.map(p => fileMapper[p.getFile()]);
    }

    static rankToMatrix(...rankPosition: Position[]): number[] {
        return rankPosition.map(p => p.getRank() - RANK_OFFSET);
    }

    static matrixToFile(file: number, direction: number, spot: number): File {
        return fileMapperReverse[(file + (spot * direction)) as fileHelper] as File;
    }
    
    private calculateDistance(fromPosition: Position, toPosition: Position): number[] {
        return [Math.abs(this.fromFile - this.toFile), Math.abs(fromPosition.getRank() - toPosition.getRank())]
    }

    private calculateDirection(fromPosition: Position, toPosition: Position): number[] {
        return [Math.sign(this.toFile - this.fromFile), Math.sign(toPosition.getRank() - fromPosition.getRank())]
    }
    
}