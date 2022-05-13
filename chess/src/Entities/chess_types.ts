export type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Color = 'Black' | 'White';
export type PieceKind = 'King' | 'Queen' | 'Rook' | 'Bishop' | 'Knight' | 'Pawn';
export type GameState = 'White\'s Turn' | 'Black\'s Turn';
export type GameOutcome = 'Draw' | 'Black Wins' | 'White Wins' | 'Playing' | 'Waiting for Players' | 'Game hasn\'t started yet';
export type GameStatus = 'Illegal Move, The king is exposed!' | 'Illegal Move' | 'It\'s not empty' |'There is something in the way' | 'Incorrect piece color' | 'Current Board status' | 'Piece has been moved' | 'Piece didn\'t move' | 'Game Has Been Started' | 'Game is not live yet' | 'Invalid move' | 'Game is full!' | 'A Player has joined the game!';