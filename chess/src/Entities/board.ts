import {Color, File, GameStatus, Rank} from "./chess_types";
import Piece from "./piece";
import Rook from "./rook";
import Knight from "./knight";
import Bishop from "./bishop";
import Queen from "./queen";
import King from "./king";
import Pawn from "./pawn";
import Position from "./position";
import {fileHelper, fileMapper, fileMapperReverse} from "./fileMapper";

export default class Board {
    public board!: (null[] | Piece[])[];
    public capturedPieces: Piece[] = [];
    public currentTurn!: Color;
    public turn!: number;
    private kings: King[] = [];

    constructor() {
    }

    getPieceAt(board: (null[] | Piece[])[], pos: Position): Piece | null {
        return board[pos.getRank() - 1][fileMapper[pos.getFile()]];
    }

    createBoard(): void {
        this.turn = 0;
        this.currentTurn = 'White';
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
        this.kings.push(new King('King', 'White', 'E', 1));
        this.kings.push(new King('King', 'Black', 'E', 8));
    }
    
    isPathAvailable(board:(null[] | Piece[])[], from: Position, to: Position): boolean{
        const fromMappedFile = fileMapper[from.getFile()];
        const toMappedFile = fileMapper[to.getFile()];
        const distX = Math.abs(fromMappedFile - toMappedFile);
        const distY = Math.abs(from.getRank() - to.getRank());
        const signedDistX = Math.sign(toMappedFile - fromMappedFile);
        const signedDistY = Math.sign(to.getRank() - from.getRank())

        for (let square = 1; square < Math.max(distX, distY); square++) {
            const pieceInFrontX: File = fileMapperReverse[(fromMappedFile + (square * signedDistX)) as fileHelper] as File ;
            const pieceInFrontY: Rank = from.getRank() + (square * signedDistY) as Rank;
            const pos = new Position(pieceInFrontX, pieceInFrontY);
            if(this.getPieceAt(board, pos) != null)
            {
                return false;
            }
        }
        
        return true;
    }
    
    isKingOnCheck(board: (null[] | Piece[])[], from: Position, to: Position, turn: Color): boolean{
        let king!: King;
        if(turn == 'White'){
            king = this.kings[0];
        } else {
            king = this.kings[1];
        }

        for(let x = 0; x < board.length; x++){
            for(let y = 0; y < board[x].length; y++) {
                if(board[x][y] == null) continue;
                const piece = board[x][y] as Piece;
                if(piece.getColor() == turn) continue;
                if(!piece.canMove(king.getPosition())) continue;
                const kingExposed = this.isPathAvailable(board, piece.getPosition(), king.getPosition());
                console.log(kingExposed)
                if(kingExposed) return true;
            }
        }
        
        return false;
    }

    move(currentTurnColour: Color, from: Position, to: Position): GameStatus {
        if (currentTurnColour != this.currentTurn) return "Incorrect piece color";
        const fromMappedFile = fileMapper[from.getFile()];
        const toMappedFile = fileMapper[to.getFile()];
        const pieceToMove = this.board[from.getRank() - 1][fromMappedFile];

        /* Check that the piece is not null
        * Or it's the same color as the player moving
        * that can move to that spot
        * that the space is empty (to change with captures)
        */
        if (pieceToMove === null) return "Invalid move";
        if (pieceToMove.getColor() != this.currentTurn) return "Incorrect piece color";
        if (!pieceToMove.canMove(to)) return "Illegal Move";
        if (this.getPieceAt(this.board, to) !== null) return 'It\'s not empty';

        const stepResult = this.isPathAvailable(this.board, from, to);
        if(!stepResult) return "There is something in the way";
        
        const mockBoard: (null[] | Piece[])[] = this.board.map(arr => arr.slice(0));
        mockBoard[from.getRank() - 1][fromMappedFile] = null;
        mockBoard[to.getRank() - 1][toMappedFile] = pieceToMove;
        const kingExposed:boolean = this.isKingOnCheck(mockBoard, from, to, this.currentTurn);
        if(kingExposed) return 'Illegal Move, The king is exposed!';
        
        this.turn++;
        if (currentTurnColour == 'White') this.currentTurn = 'Black';
        if (currentTurnColour == 'Black') this.currentTurn = 'White';

        pieceToMove.setPiecePosition(to);
        pieceToMove.setMoved();
        this.board[from.getRank() - 1][fromMappedFile] = null;
        this.board[to.getRank() - 1][toMappedFile] = pieceToMove;
        return "Piece has been moved";
    }
}