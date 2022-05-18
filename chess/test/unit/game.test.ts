import GameService from "../../src/Services/GameService";
import {Color} from "../../src/Entities/chess_types";
import Position from "../../src/Entities/position";

const game = new GameService();
game.startGame();
game.makePlayer('A');
game.makePlayer('B');

test('White moves Pawn E2 to E3', () => {

    const team: Color = 'White';
    const from: Position = new Position('E',2);
    const to: Position = new Position('E', 3)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');
});

test('Black moves Pawn D7 to D6', () => {

    const team: Color = 'Black';
    const from: Position = new Position('D',7);
    const to: Position = new Position('D', 6)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');
});

test('White moves Bishop F1 to B5', () => {

    const team: Color = 'White';
    const from: Position = new Position('F',1);
    const to: Position = new Position('B', 5)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');
});

test('Black moves Pawn A7 to A6', () => {

    const team: Color = 'Black';
    const from: Position = new Position('A',7);
    const to: Position = new Position('A', 6)

    expect(game.board.movePieceTo(team, from, to)).toBe('Illegal Move, The king is exposed!');
});

test('Black moves Queen D8 to D7, Blocks', () => {

    const team: Color = 'Black';
    const from: Position = new Position('D',8);
    const to: Position = new Position('D', 7)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');
});