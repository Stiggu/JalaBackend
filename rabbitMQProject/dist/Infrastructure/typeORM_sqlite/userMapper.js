"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = require("../../Core/User");
class UserMapper {
    static mapToCore(data) {
        return new User_1.User({
            id: data.id,
            name: data.name
        });
    }
    static mapToEntity(data) {
        return {
            id: data.id,
            name: data.name,
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=userMapper.js.map