import {fileType} from "./types";
import File from "./file";
import {Book} from "./book";

export default class Exporter {
    static invoice(book: Book, quantity: number, total: number, invoiceType: fileType): boolean {
        const fileManager = new File(book, quantity, total, invoiceType);
        return fileManager.print();
    }

    static saveFile(book: Book, quantity: number, total: number, invoiceType: fileType, path: string) {
        const fileManager = new File(book, quantity, total, invoiceType);
        return fileManager.saveTo(path);
    }
}