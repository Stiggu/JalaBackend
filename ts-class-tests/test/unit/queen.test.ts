import Position from '../../src/position';
import Queen from '../../src/queen';

describe('Queen tests', () => {

    const queen = new Queen('White', 'D', 1);
    
    it("Should move vertically", () => {
        const position = new Position('D', 8);
        expect(queen.canMove(position)).toBe(true);
    });
    
    it("Should move Horizontally", () => {
        const position = new Position('A', 1);
        expect(queen.canMove(position)).toBe(true);
    });
    
    it("should move diagonally", () => {
        let position = new Position('H', 5);
        expect(queen.canMove(position)).toBe(true);
    
        position = new Position('A', 4);
        expect(queen.canMove(position)).toBe(true);
    });
    
    it("Shouldnt not Move in L", () => {
        let position = new Position('C', 3);
        expect(queen.canMove(position)).toBe(false);
        
        position = new Position('C', 3);
        expect(queen.canMove(position)).toBe(false);
    });
    
    it("Shouldnt move other places", () => {
        let position = new Position('C', 5);
        expect(queen.canMove(position)).toBe(false);
        
        position = new Position('F', 8);
        expect(queen.canMove(position)).toBe(false);
    });

    it("Shouldnt on itself", () => {
        const position = new Position('D', 1);
        expect(queen.canMove(position)).toBe(false);
    });
});
