import { File, Rank } from './chess_types';

export default class Position {
    constructor(private file: File, private rank: Rank){}
}