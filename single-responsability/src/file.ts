import {fileType} from "./types";

export default class File {
    constructor(private fileType: fileType) {
    }
    
    saveTo(path: string): boolean{
        // Do saving
        // True = saved
        // False = didn't save
        return true;
    }
}