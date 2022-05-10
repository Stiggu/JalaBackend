import { Book } from "./book";
import Exporter from "./exporter";
import FileSaver from "./filesaver";

export class Invoice {
    
    private exporter: Exporter = new Exporter();
    private fileSaver: FileSaver = new FileSaver();
    
    constructor(
        public book: Book,
        public quantity: number,
        public tax: number,
        public total: number) {
    }

    calculateTotal() {
        return this.total + this.tax;
    }

    printInvoice() {
        return this.exporter.invoice("invoiceType");
    }

    saveToFile() {
        this.fileSaver.saveFile("png", "path/to/file");
    }
}