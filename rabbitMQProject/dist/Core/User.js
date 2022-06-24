"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(data) {
        if (data.id) {
            this.id = data.id;
        }
        this.name = data.name;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map