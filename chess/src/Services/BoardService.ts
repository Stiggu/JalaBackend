import Piece from "../Entities/piece";
import {BoardSquares, Color, File, GameStatus, Rank} from "../Entities/chess_types";
import King from "../Entities/king";
import Position from "../Entities/position";
import {fileHelper, fileMapper, fileMapperReverse} from "../Entities/fileMapper";
import Rook from "../Entities/rook";
import Knight from "../Entities/knight";
import Bishop from "../Entities/bishop";
import Queen from "../Entities/queen";
import Pawn from "../Entities/pawn";
import IBoard from "../Entities/IBoard";
import {
    BLACK_KING,
    EMPTY, FIRST_TURN,
    PATH_START_POSITION,
    PIECES,
    RANK_OFFSET,
    TEAMS,
    WHITE_KING
} from "../Entities/chess_globals";

export default class BoardService implements IBoard {
    board!: BoardSquares;
    capturedPieces: Piece[] = [];
    currentTeamTurn!: Color;
    turn!: number;
    kings: King[] = [];

    constructor() {
    }

    getPieceAt(pos: Position): Piece | null {
        const [file] = this.fileToMatrix(pos);
        const [rank] = this.rankToMatrix(pos);
        return this.board[rank][file];
    }

    resetBoard(): void {
        this.turn = FIRST_TURN;
        this.currentTeamTurn = TEAMS.WHITE as Color;
        this.createNewBoard();
        this.createNewKings();
    }

    createNewBoard(): void {
        this.board = [
            [
                new Rook('Rook', 'White', 'A', 1),
                new Knight('Knight', 'White', 'B', 1),
                new Bishop('Bishop', 'White', 'C', 1),
                new Queen('Queen', 'White', 'D', 1),
                new King('King', 'White', 'E', 1),
                new Bishop('Bishop', 'White', 'F', 1),
                new Knight('Knight', 'White', 'G', 1),
                new Rook('Rook', 'White', 'H', 1)
            ],
            [
                new Pawn('Pawn', 'White', 'A', 2),
                new Pawn('Pawn', 'White', 'B', 2),
                new Pawn('Pawn', 'White', 'C', 2),
                new Pawn('Pawn', 'White', 'D', 2),
                new Pawn('Pawn', 'White', 'E', 2),
                new Pawn('Pawn', 'White', 'F', 2),
                new Pawn('Pawn', 'White', 'G', 2),
                new Pawn('Pawn', 'White', 'H', 2)
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [
                new Pawn('Pawn', 'Black', 'A', 7),
                new Pawn('Pawn', 'Black', 'B', 7),
                new Pawn('Pawn', 'Black', 'C', 7),
                new Pawn('Pawn', 'Black', 'D', 7),
                new Pawn('Pawn', 'Black', 'E', 7),
                new Pawn('Pawn', 'Black', 'F', 7),
                new Pawn('Pawn', 'Black', 'G', 7),
                new Pawn('Pawn', 'Black', 'H', 7)
            ],
            [
                new Rook('Rook', 'Black', 'A', 8),
                new Knight('Knight', 'Black', 'B', 8),
                new Bishop('Bishop', 'Black', 'C', 8),
                new Queen('Queen', 'Black', 'D', 8),
                new King('King', 'Black', 'E', 8),
                new Bishop('Bishop', 'Black', 'F', 8),
                new Knight('Knight', 'Black', 'G', 8),
                new Rook('Rook', 'Black', 'H', 8)
            ],
        ]
    }

    createNewKings(): void {
        this.kings = [];
        this.kings.push(new King('King', 'White', 'E', 1));
        this.kings.push(new King('King', 'Black', 'E', 8));
    }

    // TODO Move to another service
    fileToMatrix(...filePosition: Position[]): number[] {
        return filePosition.map(p => fileMapper[p.getFile()]);
    }

    rankToMatrix(...rankPosition: Position[]): number[] {
        return rankPosition.map(p => p.getRank() - RANK_OFFSET);
    }

    matrixToFile(file: number, direction: number, spot: number): File {
        return fileMapperReverse[(file + (spot * direction)) as fileHelper] as File;
    }

    calculateDistance(fromFile: number, fromRank: number, toFile: number, toRank: number): number[] {
        return [Math.abs(fromFile - toFile), Math.abs(fromRank - toRank)]
    }

    getEnemyKing(team: Color): King {
        if (team === TEAMS.WHITE) {
            return this.kings[WHITE_KING];
        } else {
            return this.kings[BLACK_KING];
        }
    }

    isPositionEmpty(pos: Position): boolean {
        return this.getPieceAt(pos) == EMPTY;
    }
    //

    isPathAvailable(board: BoardSquares, fromPosition: Position, toPosition: Position): boolean {
        const [fromFile, toFile] = this.fileToMatrix(fromPosition, toPosition);
        const [distanceX, distanceY] = this.calculateDistance(fromFile, fromPosition.getRank(), toFile, toPosition.getRank());
        const signedDistanceX = Math.sign(toFile - fromFile);
        const signedDistanceY = Math.sign(toPosition.getRank() - fromPosition.getRank());

        for (let square = PATH_START_POSITION; square < Math.max(distanceX, distanceY); square++) {
            const pieceInFrontX: File = this.matrixToFile(fromFile, signedDistanceX, square);
            const pieceInFrontY: Rank = fromPosition.getRank() + (square * signedDistanceY) as Rank;
            const pos = new Position(pieceInFrontX, pieceInFrontY);
            if (!this.isPositionEmpty(pos)) {
                return false;
            }
        }
        return true;
    }

    isKingOnCheck(board: BoardSquares, fromPosition: Position, toPosition: Position, team: Color): boolean {
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                if (board[row][column] === EMPTY) continue;

                const piece = board[row][column] as Piece;
                const enemyKing: King = this.getEnemyKing(piece.getColor())

                if (piece.getColor() === team) continue;
                if (!piece.canMove(enemyKing.getPosition())) continue;
                const kingExposed = this.isPathAvailable(board, piece.getPosition(), enemyKing.getPosition());
                if (kingExposed) return true;
            }
        }
        return false;
    }

    copyMainBoard(): BoardSquares {
        return this.board.map(arr => arr.slice(0));
    }

    advanceTurn(): void {
        this.turn++;

        if (this.currentTeamTurn === TEAMS.WHITE) {
            this.currentTeamTurn = TEAMS.BLACK as Color;
        } else if (this.currentTeamTurn === TEAMS.BLACK) {
            this.currentTeamTurn = TEAMS.WHITE as Color;
        }
    }

    move(pieceToMove: Piece, fromPosition: Position, toPosition: Position): void {
        const [fromFile, toFile] = this.fileToMatrix(fromPosition, toPosition);
        const [fromRank, toRank] = this.rankToMatrix(fromPosition, toPosition);
        pieceToMove.setPiecePosition(toPosition);
        pieceToMove.setMoved();
        this.board[fromRank][fromFile] = EMPTY;
        this.board[toRank][toFile] = pieceToMove;
    }

    movePieceTo(team: Color, fromPosition: Position, toPosition: Position): GameStatus {
        if (team !== this.currentTeamTurn) return 'Incorrect piece color';
        const [fromFile, toFile] = this.fileToMatrix(fromPosition, toPosition);
        const [fromRank, toRank] = this.rankToMatrix(fromPosition, toPosition);
        const pieceToMove = this.board[fromRank][fromFile];
        
        if (pieceToMove === EMPTY) return 'Spot it empty';
        if (pieceToMove.getColor() !== this.currentTeamTurn) return 'Incorrect piece color';
        if (!pieceToMove.canMove(toPosition)) return 'Illegal Move';
        
        // TODO Capture logic
        if (!this.isPositionEmpty(toPosition)) return 'It\'s not empty';

        if (pieceToMove.name !== PIECES.KNIGHT) {
            const stepResult = this.isPathAvailable(this.board, fromPosition, toPosition);
            if (!stepResult) return 'There is something in the way';
        }

        const mockBoard: BoardSquares = this.copyMainBoard();
        mockBoard[fromRank][fromFile] = EMPTY;
        mockBoard[toRank][toFile] = pieceToMove;
        const kingExposed: boolean = this.isKingOnCheck(mockBoard, fromPosition, toPosition, this.currentTeamTurn);
        if (kingExposed) return 'Illegal Move, The king is exposed!';

        this.advanceTurn();
        this.move(pieceToMove, fromPosition, toPosition);

        return 'Piece has been moved';
    }
}