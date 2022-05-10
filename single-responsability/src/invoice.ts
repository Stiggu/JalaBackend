import { Book } from "./book";
import Exporter from "./exporter";
import FileSaver from "./filesaver";

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

    printInvoice() {
        return Exporter.invoice("PNG");
    }

    saveToFile() {
        return FileSaver.saveFile("PNG", "path/to/file");
    }
}