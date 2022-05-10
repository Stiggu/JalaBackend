import {fileType} from "./types";
import File from "./file";

export default class Exporter {
    static invoice(invoiceType: fileType): File{
        return new File(invoiceType);
    }
}