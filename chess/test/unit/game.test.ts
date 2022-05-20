import GameService from "../../src/Services/GameService";
import {Color} from "../../src/Entities/chess_types";
import Position from "../../src/Entities/position";

let game = new GameService();


beforeEach(() => {
    game = new GameService();
    game.startGame();
    game.makePlayer('A');
    game.makePlayer('B');
})

test('Check + Queen block', () => {

    let team: Color = 'White';
    let from: Position = new Position('E', 2);
    let to: Position = new Position('E', 3);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('D', 7);
    to = new Position('D', 6)
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('F', 1);
    to = new Position('B', 5)
    expect(game.board.movePieceTo(team, from, to)).toBe('Black is on check');

    team = 'Black';
    from = new Position('A', 7);
    to = new Position('A', 6);
    expect(game.board.movePieceTo(team, from, to)).toBe('Illegal Move, The black king is exposed!');

    team = 'Black';
    from = new Position('D', 8);
    to = new Position('D', 7)
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('B', 5);
    to = new Position('D', 7)
    expect(game.board.movePieceTo(team, from, to)).toBe('Black is on check');

    team = 'Black';
    from = new Position('E', 8);
    to = new Position('D', 8)
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');
});

test('Bknight eats pawn', () => {

    let team: Color = 'White';
    let from: Position = new Position('E', 2);
    let to: Position = new Position('E', 3)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('G', 8);
    to = new Position('F', 6)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('G', 2);
    to = new Position('G', 3);

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('F', 6);
    to = new Position('E', 4);

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('G', 1);
    to = new Position('F', 3);

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('E', 4);
    to = new Position('G', 3);

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');
});

test('Fool\'s Mate', () => {

    let team: Color = 'White';
    let from: Position = new Position('F', 2);
    let to: Position = new Position('F', 3)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('E', 7);
    to = new Position('E', 6)

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('G', 2);
    to = new Position('G', 4);

    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('D', 8);
    to = new Position('H', 4);

    expect(game.board.movePieceTo(team, from, to)).toBe('White has lost');
});

test('Smothered Mate', () => {

    let team: Color = 'White';
    let from: Position = new Position('E', 2);
    let to: Position = new Position('E', 4)
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('C', 7);
    to = new Position('C', 6)
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('D', 2);
    to = new Position('D', 4);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('D', 7);
    to = new Position('D', 5);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('B', 1);
    to = new Position('C', 3);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('D', 5);
    to = new Position('E', 4);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('C', 3);
    to = new Position('E', 4);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('B', 8);
    to = new Position('D', 7);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('D', 1);
    to = new Position('E', 2);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'Black';
    from = new Position('G', 8);
    to = new Position('F', 6);
    expect(game.board.movePieceTo(team, from, to)).toBe('Piece has been moved');

    team = 'White';
    from = new Position('E', 4);
    to = new Position('D', 6);
    expect(game.board.movePieceTo(team, from, to)).toBe('Black has lost');
});