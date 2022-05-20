import Piece from "../Entities/piece";
import {BoardSquares, Color, File, GameStatus, Rank} from "../Entities/chess_types";
import King from "../Entities/king";
import Position from "../Entities/position";
import Rook from "../Entities/rook";
import Knight from "../Entities/knight";
import Bishop from "../Entities/bishop";
import Queen from "../Entities/queen";
import Pawn from "../Entities/pawn";
import IBoard from "../Entities/IBoard";
import {
    availablePositions,
    BLACK_KING,
    EMPTY,
    FIRST_TURN,
    PATH_START_POSITION,
    PIECES,
    TEAMS,
    WHITE_KING,
    Y
} from "../Entities/chess_globals";
import Calculator from "../Entities/calculator";
import {fileHelper, fileMapperReverse} from "../Entities/fileMapper";

export default class BoardService implements IBoard {


    board!: BoardSquares;
    capturedPieces: Piece[] = [];
    currentTeamTurn!: Color;
    turn!: number;
    kings: King[] = [];

    constructor() {
    }

    getPieceAt(board: BoardSquares, pos: Position): Piece | null {
        const [file] = Calculator.fileToMatrix(pos);
        const [rank] = Calculator.rankToMatrix(pos);
        return board[rank][file];
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

    getEnemyKings(board: BoardSquares): King[] {
        const kings: King[] = [];
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                if (board[row][column] === EMPTY) {
                    continue;
                }

                const piece = board[row][column] as King;

                if (piece.name === PIECES.KING) {
                    if (piece.getColor() === TEAMS.WHITE) {
                        kings[WHITE_KING] = piece;
                    } else {
                        kings[BLACK_KING] = piece;
                    }
                }
            }
        }
        return kings;
    }

    isPositionEmpty(board: BoardSquares, pos: Position): boolean {
        return this.getPieceAt(board, pos) == EMPTY;
    }

    isPathAvailable(board: BoardSquares, fromPosition: Position, toPosition: Position): boolean {
        const positionCalculator = new Calculator(fromPosition, toPosition);

        for (let square = PATH_START_POSITION; square < Math.max(positionCalculator.distanceX, positionCalculator.distanceY); square++) {
            const pieceInFrontX: File = Calculator.matrixToFile(positionCalculator.fromFile, positionCalculator.directionX, square);
            const pieceInFrontY: Rank = fromPosition.getRank() + (square * positionCalculator.directionY) as Rank;
            const pos = new Position(pieceInFrontX, pieceInFrontY);
            if (!this.isPositionEmpty(board, pos)) {
                return false;
            }
        }
        return true;
    }

    canKingMove(board: BoardSquares, kingType: number): boolean {
        const king = this.getEnemyKings(board)[kingType];
        

        for (const availablePosition of availablePositions) {
            try {
                const rankToGo = king.getPosition().getRank() + availablePosition[Y] as Rank;
                const [fileToGoMapped] = Calculator.fileToMatrix(king.getPosition());
                const fileToGo = fileMapperReverse[fileToGoMapped as fileHelper] as File;
                if(this.getPieceAt(board, new Position(fileToGo, rankToGo)) !== EMPTY){
                    continue;
                }
                const copyMainBoard: BoardSquares = this.copyMainBoard(board, king.getPosition(), new Position(fileToGo, rankToGo));
                const kingsCheckStatus: boolean = this.kingsOnCheck(copyMainBoard, king.getPosition(), new Position(fileToGo, rankToGo))[kingType];
                if (kingsCheckStatus) {
                    return true;
                }
            } catch (e) {
                // console.log('Unavailable');
                // continue;
            }
        }
        return false;
    }

    findKingAttackers(board: BoardSquares, kingType: number): Piece[] {
        const king: King = this.getEnemyKings(board)[kingType];
        const attackers: Piece[] = [];

        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                if (board[row][column] === EMPTY) {
                    continue;
                }

                const piece = board[row][column] as Piece;
                if (!piece.canCapture(king)) {
                    continue;
                }
                const kingExposed = this.isPathAvailable(board, piece.getPosition(), king.getPosition());
                if (kingExposed) {
                    attackers.push(piece);
                }
            }
        }

        return attackers;
    }

    canAttackersBeCaptured(board: BoardSquares, attackers: Piece[]): boolean {
        for (const attacker of attackers) {
            for (let row = 0; row < board.length; row++) {
                for (let column = 0; column < board[row].length; column++) {
                    if (board[row][column] === EMPTY) {
                        continue;
                    }

                    const piece = board[row][column] as Piece;
                    if (piece.getColor() === attacker.getColor() || !piece.canCapture(attacker)) {
                        continue;
                    }

                    if (piece.canCapture(attacker)) {
                        const attackerExposed = this.isPathAvailable(board, piece.getPosition(), attacker.getPosition());
                        const captureBoard: BoardSquares = this.copyMainBoard(board, piece.getPosition(), attacker.getPosition());
                        const kingsCheckStatus: boolean[] = this.kingsOnCheck(captureBoard, piece.getPosition(), attacker.getPosition());
                        const kingColor = attacker.getColor() === TEAMS.WHITE ? BLACK_KING : WHITE_KING;
                        if (piece.name !== PIECES.KNIGHT && attackerExposed) {
                            if(!kingsCheckStatus[kingColor]){
                                return true;
                            }
                        } else if(piece.name === PIECES.KNIGHT){
                            if(!kingsCheckStatus[kingColor]){
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    findBlockSquares(board: BoardSquares, kingType: number) {
        const king: King = this.getEnemyKings(board)[kingType];
        const attackers = this.findKingAttackers(board, kingType);
        const squares: Position[] = [];

        for (const attacker of attackers) {
            if (attacker.name === PIECES.KNIGHT) {
                continue;
            }
            const positionCalculator = new Calculator(attacker.getPosition(), king.getPosition());
            let preSquares = [];

            for (let square = PATH_START_POSITION; square < Math.max(positionCalculator.distanceX, positionCalculator.distanceY); square++) {
                const pieceInFrontX: File = Calculator.matrixToFile(positionCalculator.fromFile, positionCalculator.directionX, square);
                const pieceInFrontY: Rank = attacker.getPosition().getRank() + (square * positionCalculator.directionY) as Rank;
                const pos = new Position(pieceInFrontX, pieceInFrontY);

                preSquares.push(pos);

                if (!this.isPositionEmpty(board, pos)) {
                    preSquares = [];
                    break;
                }
            }
            squares.push(...preSquares);
        }
        return squares;
    }

    canSquaresBeBlocked(board: BoardSquares, kingType: number, squares: Position[]) {
        const king: King = this.getEnemyKings(board)[kingType];
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                if (board[row][column] === EMPTY) {
                    continue;
                }
                const piece = board[row][column] as Piece;

                if (king.getColor() !== piece.getColor()) {
                    continue;
                }
                if (piece.name === PIECES.KING) {
                    continue;
                }

                for (const square of squares) {
                    if (!piece.canMove(square)) {
                        continue;
                    }

                    const pieceBlocked = this.isPathAvailable(board, piece.getPosition(), square);

                    if (pieceBlocked) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    kingsOnCheck(board: BoardSquares, fromPosition: Position, toPosition: Position): boolean[] {
        let kingsOnCheck: boolean[] = [false, false];
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                if (board[row][column] === EMPTY) {
                    continue;
                }

                const piece = board[row][column] as Piece;
                const kings: King[] = this.getEnemyKings(board);
                const enemyKing = kings[piece.getColor() == TEAMS.WHITE ? BLACK_KING : WHITE_KING];

                if (!piece.canCapture(enemyKing)) {
                    continue;
                }

                if(piece.name === PIECES.KNIGHT){
                    if (enemyKing.getColor() === TEAMS.WHITE) {
                        kingsOnCheck[WHITE_KING] = true;
                    } else {
                        kingsOnCheck[BLACK_KING] = true;
                    }
                }
                
                const kingExposed = this.isPathAvailable(board, piece.getPosition(), enemyKing.getPosition());
                if (kingExposed) {
                    if (enemyKing.getColor() === TEAMS.WHITE) {
                        kingsOnCheck[WHITE_KING] = true;
                    } else {
                        kingsOnCheck[BLACK_KING] = true;
                    }
                }
            }
        }
        return kingsOnCheck;
    }

    copyMainBoard(board:BoardSquares, fromPosition: Position, toPosition: Position): BoardSquares {
        const copiedBoard = board.map(arr => arr.slice(0));
        const [fromFile, toFile] = Calculator.fileToMatrix(fromPosition, toPosition);
        const [fromRank, toRank] = Calculator.rankToMatrix(fromPosition, toPosition);
        const pieceToCopy = copiedBoard[fromRank][fromFile] as Piece;
        const pieceToMove = Object.assign(Object.create(Object.getPrototypeOf(pieceToCopy)), pieceToCopy);
        copiedBoard[fromRank][fromFile] = EMPTY;
        copiedBoard[toRank][toFile] = pieceToMove;
        pieceToMove.setPiecePosition(toPosition);
        return copiedBoard
    }

    advanceTurn(): void {
        this.turn++;

        if (this.currentTeamTurn === TEAMS.WHITE) {
            this.currentTeamTurn = TEAMS.BLACK as Color;
        } else if (this.currentTeamTurn === TEAMS.BLACK) {
            this.currentTeamTurn = TEAMS.WHITE as Color;
        }

        for (let row = 0; row < this.board.length; row++) {
            for (let column = 0; column < this.board[row].length; column++) {
                if (this.board[row][column] === null) {
                    continue;
                }
                const currentPiece = this.board[row][column] as Piece;
                currentPiece.turn = this.turn;
            }
        }
    }

    updateKing(king: Piece) {
        const kingTeam = king.getColor() === TEAMS.WHITE ? WHITE_KING : BLACK_KING;
        this.kings[kingTeam] = king;
    }

    movePieceTo(team: Color, fromPosition: Position, toPosition: Position): GameStatus {
        if (team !== this.currentTeamTurn) {
            return 'Incorrect piece color';
        }
        const [fromFile, toFile] = Calculator.fileToMatrix(fromPosition, toPosition);
        const [fromRank, toRank] = Calculator.rankToMatrix(fromPosition, toPosition);
        const pieceToMove = this.board[fromRank][fromFile];

        if (pieceToMove === EMPTY) {
            return 'Spot it empty';
        }

        if (pieceToMove.getColor() !== this.currentTeamTurn) {
            return 'Incorrect piece color';
        }

        if (pieceToMove.name !== PIECES.KNIGHT) {
            const stepResult = this.isPathAvailable(this.board, fromPosition, toPosition);
            if (!stepResult) {
                return 'There is something in the way';
            }
        }

        const copyMainBoard: BoardSquares = this.copyMainBoard(this.board, fromPosition, toPosition);
        const kingsCheckStatus: boolean[] = this.kingsOnCheck(copyMainBoard, fromPosition, toPosition);
        
        let canCapture = false;
        if (!this.isPositionEmpty(this.board, toPosition)) {

            const pieceToCapture = this.getPieceAt(this.board, toPosition) as Piece;

            if (pieceToMove.canCapture(pieceToCapture)) {
                pieceToCapture.isCaptured = true;
                canCapture = true;
                this.capturedPieces.push(pieceToCapture);
            } else {
                return 'It\'s not empty';
            }
        }

        if (this.currentTeamTurn === TEAMS.WHITE && kingsCheckStatus[WHITE_KING]) {
            return 'Illegal Move, The white king is exposed!';
        } else if (this.currentTeamTurn === TEAMS.BLACK && kingsCheckStatus[BLACK_KING]) {
            return 'Illegal Move, The black king is exposed!';
        }

        if (!canCapture) {
            if (!pieceToMove.canMove(toPosition)) {
                return 'Illegal Move';
            }
        }
        
        const kingColor = this.currentTeamTurn === TEAMS.BLACK ? WHITE_KING : BLACK_KING;
        const kingCheckStatus = kingsCheckStatus[kingColor];
        
        if(kingCheckStatus){
            const canKingMove = this.canKingMove(copyMainBoard, kingColor);
            const attackers = this.findKingAttackers(copyMainBoard, kingColor);
            const canAttackersBeCaptured = this.canAttackersBeCaptured(copyMainBoard, attackers);
            const squaresToBeBlocked = this.findBlockSquares(copyMainBoard, kingColor);
            const canSquaresBeBlocked = this.canSquaresBeBlocked(copyMainBoard, kingColor, squaresToBeBlocked);
            if (!canKingMove && !canAttackersBeCaptured && !canSquaresBeBlocked) {
                if(kingColor === WHITE_KING){
                    return 'White has lost';
                } else {
                    return 'Black has lost';
                }
            }
        }
        
        this.advanceTurn();

        pieceToMove.setPiecePosition(toPosition);
        pieceToMove.setMoved();
        this.board[fromRank][fromFile] = EMPTY;
        this.board[toRank][toFile] = pieceToMove;

        if (pieceToMove.name === PIECES.KING) {
            this.updateKing(pieceToMove);
        }

        if (kingsCheckStatus[WHITE_KING]) {
            return 'White is on check';
        } else if (kingsCheckStatus[BLACK_KING]) {
            return 'Black is on check';
        }

        return 'Piece has been moved';
    }
}