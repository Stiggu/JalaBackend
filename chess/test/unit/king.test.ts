import King from "../../src/Entities/king";
import Position from "../../src/Entities/position";

const king = new King('King','White', 'E', 1);

it("Should move forward", () => {
    const position = new Position('E', 2);
    expect(king.canMove(position)).toBe(true);
});

it("Should move left", () => {
    const position = new Position('D', 1);
    expect(king.canMove(position)).toBe(true);
});

it("Shouldn't Move", () => {
    const position = new Position('E', 1);
    expect(king.canMove(position)).toBe(false);
});

it("Shouldn Move to the left 3 spaces", () => {
    const position = new Position('E', 3);
    expect(king.canMove(position)).toBe(false);
});