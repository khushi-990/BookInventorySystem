"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const common_1 = require("@nestjs/common");
exports.successResponse = {
    CREATED: {
        message: "Created successfully.",
        statusCode: common_1.HttpStatus.CREATED,
    },
    UPDATED: { message: "Updated successfully.", statusCode: common_1.HttpStatus.OK },
    DELETED: { message: "Deleted successfully.", statusCode: common_1.HttpStatus.OK },
};
//# sourceMappingURL=success.helper.js.map