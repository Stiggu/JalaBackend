import GeometricFigure from "./geometricFigure";

export default class Rectangle extends GeometricFigure {
    constructor(public height: number, public width: number) {
        super(height,width);
    }
    
    calculateArea(): number {
        return this.width * this.height;
    }
}