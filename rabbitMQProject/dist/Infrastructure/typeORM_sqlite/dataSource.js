"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationalDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
exports.RelationalDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "rabbit",
    synchronize: true,
    logging: true,
    entities: [user_entity_1.UserEntity],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=dataSource.js.map