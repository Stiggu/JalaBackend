import Bishop from "../../src/Entities/bishop";
import Position from "../../src/Entities/position";

describe('Bishop tests', () => {

    const bishop = new Bishop('Bishop','White', 'D', 1);
    
    it("Shouldnt move vertically", () => {
        const position = new Position('D', 8);
        expect(bishop.canMove(position)).toBe(false);
    });
    
    it("Shouldnt move Horizontally", () => {
        const position = new Position('A', 1);
        expect(bishop.canMove(position)).toBe(false);
    });
    
    it("should move diagonally", () => {
        let position = new Position('H', 5);
        expect(bishop.canMove(position)).toBe(true);
    
        position = new Position('A', 4);
        expect(bishop.canMove(position)).toBe(true);
    });
    
    it("Shouldnt not Move in L", () => {
        let position = new Position('C', 3);
        expect(bishop.canMove(position)).toBe(false);
        
        position = new Position('C', 3);
        expect(bishop.canMove(position)).toBe(false);
    });

    it("Shouldnt on itself", () => {
        const position = new Position('D', 1);
        expect(bishop.canMove(position)).toBe(false);
    });
});