export default abstract class GeometricFigure {
    constructor(public width: number, public height: number) {}

    abstract calculateArea(): number;
}