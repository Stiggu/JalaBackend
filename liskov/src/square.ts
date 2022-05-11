import GeometricFigure from "./geometricFigure";

export default class Square extends GeometricFigure {
    constructor(public size: number) {
        super(size,size);
    }
    
    calculateArea(): number {
        return this.size * this.size;
    }
}