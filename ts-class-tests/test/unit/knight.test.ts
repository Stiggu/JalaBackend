import Position from '../../src/position';
import Knight from '../../src/knight';

describe('Knight tests', () => {

    const knight = new Knight('White', 'D', 1);
    
    it("Should move UP L left", () => {
        const position = new Position('C', 3);
        expect(knight.canMove(position)).toBe(true);
    });
    
    it("Should move UP L Right", () => {
        const position = new Position('E', 3);
        expect(knight.canMove(position)).toBe(true);
    });
    
    it("shouldnt move diagonally", () => {
        let position = new Position('H', 5);
        expect(knight.canMove(position)).toBe(false);
    
        position = new Position('A', 4);
        expect(knight.canMove(position)).toBe(false);
    });

    it("Shouldnt on itself", () => {
        const position = new Position('D', 1);
        expect(knight.canMove(position)).toBe(false);
    });
});
