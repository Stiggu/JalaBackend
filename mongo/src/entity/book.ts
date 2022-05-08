import mongoose from 'mongoose';
import IBook from "./IBook";
const Schema = mongoose.Schema;

const bookSchema = new Schema<IBook>({
    author: {
        type: String
    },
    title: {
        type: String,
        default: 'No title'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default bookSchema