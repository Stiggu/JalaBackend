import IBook from "../entity/IBook";
import bookModel from "../entity/bookModel";
import IBookRepo from "../entity/IBookRepo";


export default class BookDatAccess {

    async save(bookToSave: IBook) {
        const bookSchema = new bookModel(bookToSave);
        return await bookSchema.save();
    }

    async read(id: string): Promise<IBookRepo> {
        return bookModel.findById(id).lean();
    }

    async update(id: string, bookToSave: IBook) {
        return bookModel
            .findByIdAndUpdate(id, bookToSave)
            .lean();
    }

    async remove(id: string) {
        return bookModel
            .findByIdAndRemove(id)
            .lean();
    }

}