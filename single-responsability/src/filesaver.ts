import {fileType} from "./types";
import File from "./file";

export default class FileSaver {
    static saveFile(type: fileType, path: string){
        const fileManager = new File(type);
        return fileManager.saveTo(path);
    }
}