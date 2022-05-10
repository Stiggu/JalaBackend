import {fileType} from "./types";
import {Book} from "./book";

export default class File {
    constructor(private book: Book, quantity: number, total: number, private fileType: fileType) {
    //    Logic depending on the fileType
    }
    
    print(): boolean {
        // logic
        return true;
    }
    
    saveTo(path: string): boolean{
        // Do saving
        // True = saved
        // False = didn't save
        return true;
    }
}