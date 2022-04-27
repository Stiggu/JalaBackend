import Position from '../../src/position';
import Rook from '../../src/rook';

describe('Rook tests', () => {

    const rook = new Rook('White', 'D', 3);
    
    it("Should move vertically", () => {
        const position = new Position('D', 8);
        expect(rook.canMove(position)).toBe(true);
    });
    it("Should move vertically", () => {
        const position = new Position('D', 1);
        expect(rook.canMove(position)).toBe(true);
    });

    it("Should move Horizontally", () => {
        const position = new Position('A', 3);
        expect(rook.canMove(position)).toBe(true);
    });
    it("Should move Horizontally", () => {
        const position = new Position('H', 3);
        expect(rook.canMove(position)).toBe(true);
    });

    it("Shouldnt move diag", () => {
        const position = new Position('E', 4);
        expect(rook.canMove(position)).toBe(false);
    });
    it("Shouldnt move", () => {
        const position = new Position('E', 2);
        expect(rook.canMove(position)).toBe(false);
    });
    it("Shouldnt move", () => {
        const position = new Position('A', 2);
        expect(rook.canMove(position)).toBe(false);
    });
});