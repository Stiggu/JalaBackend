"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("./Infrastructure/typeORM_sqlite/dataSource");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const userService_1 = require("./Services/userService");
const types_1 = require("./Services/types");
require("./Infrastructure/userController");
const userRepository_typeorm_1 = require("./Infrastructure/typeORM_sqlite/userRepository.typeorm");
const bodyParser = __importStar(require("body-parser"));
const PORT = 27015;
const container = new inversify_1.Container();
container.bind(types_1.UserTypes.userService).to(userService_1.UserService);
container.bind(types_1.UserTypes.userRepository).to(userRepository_typeorm_1.UserRepositoryTypeorm);
const server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});
dataSource_1.RelationalDataSource.initialize()
    .then(() => {
    const app = server.build();
    app.listen(PORT);
    console.log(`Server listening on: http://localhost:${PORT}`);
})
    .catch(e => console.log(e));
//# sourceMappingURL=index.js.map