import { Book } from "./book";
import Exporter from "./exporter";
import {fileType} from "./types";

export class Invoice {
    
    constructor(
        public book: Book,
        public quantity: number,
        public tax: number,
        public total: number) {
    }

    calculateTotal(): number {
        return this.total + this.tax;
    }

    printInvoice(book:Book, quantity:number, fileType: fileType) {
        Exporter.invoice(book, quantity, this.calculateTotal(), fileType);
    }

    saveToFile(book:Book, quantity:number, fileType: fileType) {
        Exporter.saveFile(book, quantity, this.calculateTotal(), fileType, "path/to/file");
    }
}