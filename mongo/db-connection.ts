import mongoose from "mongoose";

export class DbConnection {

    private DB_CONNECTION = 'mongodb://localhost:27017/books';

    async connect(){
        await mongoose.connect(this.DB_CONNECTION, {
            
        });
    }

    async disconnect(){
        await mongoose.disconnect();
    }
}