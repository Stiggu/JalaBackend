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
import {EMPTY, PATH_START_POSITION, TEAMS} from "../Entities/chess_globals";

export default class BoardService implements IBoard {
    board!: BoardSquares;
    capturedPieces: Piece[] = [];
    currentTurn!: Color;
    turn!: number;
    kings: King[] = [];

    constructor() {
    }

    getPieceAt(pos: Position): Piece | null {
        return this.board[pos.getRank() - 1][fileMapper[pos.getFile()]];
    }

    resetBoard(): void {
        this.turn = 0;
        this.currentTurn = 'White';
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

    calculateDistance(fromFile: number, fromRank: number, toFile: number, toRank: number): number[] {
        return [Math.abs(fromFile - toFile), Math.abs(fromRank - toRank)]
    }

    isPathAvailable(board: (null[] | Piece[])[], fromPosition: Position, toPosition: Position): boolean {
        const fromFile = this.fileToMatrix(fromPosition);
        const toFile = this.fileToMatrix(toPosition);
        const [distanceX, distanceY] = this.calculateDistance(fromFile, fromPosition.getRank(), toFile, toPosition.getRank());
        const signedDistanceX = Math.sign(toFile - fromFile);
        const signedDistanceY = Math.sign(toPosition.getRank() - fromPosition.getRank());

        for (let square = PATH_START_POSITION; square < Math.max(distanceX, distanceY); square++) {
            const pieceInFrontX: File = fileMapperReverse[(fromFile + (square * signedDistanceX)) as fileHelper] as File;
            const pieceInFrontY: Rank = fromPosition.getRank() + (square * signedDistanceY) as Rank;
            const pos = new Position(pieceInFrontX, pieceInFrontY);
            if (this.getPieceAt(pos) != EMPTY) {
                return false;
            }
        }

        return true;
    }

    isKingOnCheck(board: (null[] | Piece[])[], fromPosition: Position, toPosition: Position, team: Color): boolean {
        let king!: King;
        if (team == 'White') {
            king = this.kings[0];
        } else {
            king = this.kings[1];
        }

        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                if (board[x][y] == null) continue;
                const piece = board[x][y] as Piece;
                if (piece.getColor() == team) continue;
                if (!piece.canMove(king.getPosition())) continue;
                const kingExposed = this.isPathAvailable(board, piece.getPosition(), king.getPosition());
                if (kingExposed) return true;
            }
        }

        return false;
    }

    // PENDING MOVE TO ANOTHER SERVICE
    fileToMatrix(filePosition: Position): number {
        return fileMapper[filePosition.getFile()];
    }
    
    copyMainBoard(): BoardSquares {
        return this.board.map(arr => arr.slice(0));
    }

    movePieceTo(team: Color, fromPosition: Position, toPosition: Position): GameStatus {
        if (team != this.currentTurn) return 'Incorrect piece color';
        const fromFile = this.fileToMatrix(fromPosition);
        const toFile = this.fileToMatrix(toPosition);
        const pieceToMove = this.board[fromPosition.getRank() - 1][fromFile];

        /* Check that the piece is not null
        * Or it's the same color as the player moving
        * that can move to that spot
        * that the space is empty (to change with captures)
        */
        if (pieceToMove === EMPTY) return 'Spot it empty';
        if (pieceToMove.getColor() != this.currentTurn) return 'Incorrect piece color';
        if (!pieceToMove.canMove(toPosition)) return 'Illegal Move';
        if (this.getPieceAt(toPosition) !== EMPTY) return 'It\'s not empty';

        if (pieceToMove.name != 'Knight') {
            const stepResult = this.isPathAvailable(this.board, fromPosition, toPosition);
            if (!stepResult) return 'There is something in the way';
        }

        const mockBoard: BoardSquares = this.copyMainBoard();
        mockBoard[fromPosition.getRank() - 1][fromFile] = EMPTY;
        mockBoard[toPosition.getRank() - 1][toFile] = pieceToMove;
        const kingExposed: boolean = this.isKingOnCheck(mockBoard, fromPosition, toPosition, this.currentTurn);
        if (kingExposed) return 'Illegal Move, The king is exposed!';

        this.turn++;

        if (team == TEAMS.WHITE) {
            this.currentTurn = TEAMS.BLACK as Color;
        } else if (team == TEAMS.BLACK) {
            this.currentTurn = TEAMS.WHITE as Color;
        }

        pieceToMove.setPiecePosition(toPosition);
        pieceToMove.setMoved();
        this.board[fromPosition.getRank() - 1][fromFile] = EMPTY;
        this.board[toPosition.getRank() - 1][toFile] = pieceToMove;
        return 'Piece has been moved';
    }
}