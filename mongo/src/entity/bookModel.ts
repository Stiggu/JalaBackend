import {model} from "mongoose";
import IBook from "./IBook";
import bookSchema from "./book";

const bookModel = model<IBook>('Book', bookSchema);
export default bookModel;