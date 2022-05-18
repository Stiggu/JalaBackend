import Position from "../../src/Entities/position";
import Pawn from "../../src/Entities/pawn";

describe('Pawn tests', () => {

    const pawn = new Pawn('Pawn','White', 'D', 3);
    
    it("Shouldnt move UP L left", () => {
        const position = new Position('C', 5);
        expect(pawn.canMove(position)).toBe(false);
    });
    
    it("Shouldnt move UP L Right", () => {
        const position = new Position('E', 5);
        expect(pawn.canMove(position)).toBe(false);
    });
    
    it("shouldnt move diagonally", () => {
        let position = new Position('E', 4);
        expect(pawn.canMove(position)).toBe(false);
    
        position = new Position('C', 2);
        expect(pawn.canMove(position)).toBe(false);
    });

    it("Shouldnt on itself", () => {
        const position = new Position('D', 3);
        expect(pawn.canMove(position)).toBe(false);
    });

    it("Should move up", () => {
        const position = new Position('D', 4);
        expect(pawn.canMove(position)).toBe(true);
    });

    it("Shouldnt move down", () => {
        const position = new Position('D', 2);
        expect(pawn.canMove(position)).toBe(false);
    });
});
