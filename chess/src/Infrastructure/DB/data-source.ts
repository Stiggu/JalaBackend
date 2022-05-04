import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "chess.sqlite",
    logging: true,
    entities: [],
});