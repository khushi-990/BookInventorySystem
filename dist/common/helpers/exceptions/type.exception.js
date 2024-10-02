"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeExceptions = void 0;
const common_1 = require("@nestjs/common");
exports.TypeExceptions = {
    NotFoundCommonFunction(message) {
        return new common_1.HttpException({
            message: message,
            error: "Not Found",
            statusCode: common_1.HttpStatus.NOT_FOUND,
        }, common_1.HttpStatus.NOT_FOUND);
    },
    AlreadyExistsCommonFunction(message) {
        return new common_1.HttpException({
            message: message,
            error: "Already Exists",
            statusCode: common_1.HttpStatus.CONFLICT,
        }, common_1.HttpStatus.CONFLICT);
    },
    InvalidFile() {
        return new common_1.HttpException({
            message: "Uploaded file is invalid",
            error: "InvalidFile",
            statusCode: common_1.HttpStatus.BAD_REQUEST,
        }, common_1.HttpStatus.BAD_REQUEST);
    },
};
//# sourceMappingURL=type.exception.js.map