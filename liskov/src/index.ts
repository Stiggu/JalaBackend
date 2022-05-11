import Rectangle from "./rectangle";
import Square from "./square";
import GeometricFigure from "./geometricFigure";

const rectangle: GeometricFigure = new Rectangle(10, 20);
const square: GeometricFigure = new Square(10);

console.log(rectangle.calculateArea());
console.log(square.calculateArea());
testRectangle(square);

function testRectangle(rect: GeometricFigure) {
    rect.width = 5;
    rect.height = 4;
    console.log(rect.calculateArea());
}

