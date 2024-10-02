"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthExceptions = void 0;
const common_1 = require("@nestjs/common");
exports.AuthExceptions = {
    TokenExpired() {
        return new common_1.HttpException({
            message: "Token Expired use RefreshToken",
            error: "TokenExpiredError",
            statusCode: common_1.HttpStatus.FORBIDDEN,
        }, common_1.HttpStatus.FORBIDDEN);
    },
    InvalidToken() {
        return new common_1.HttpException({
            message: "Invalid Token",
            error: "InvalidToken",
            statusCode: common_1.HttpStatus.FORBIDDEN,
        }, common_1.HttpStatus.FORBIDDEN);
    },
    ForbiddenException() {
        return new common_1.HttpException({
            message: "This resource is forbidden from this user",
            error: "UnAuthorizedResourceError",
            statusCode: common_1.HttpStatus.FORBIDDEN,
        }, common_1.HttpStatus.FORBIDDEN);
    },
    InvalidUserId() {
        return new common_1.HttpException({
            message: "Invalid User Id",
            error: "InvalidUserId",
            statusCode: common_1.HttpStatus.FORBIDDEN,
        }, common_1.HttpStatus.FORBIDDEN);
    },
    InvalidPassword() {
        return new common_1.HttpException({
            message: "Please enter valid password",
            error: "InvalidPassword",
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
        }, common_1.HttpStatus.UNAUTHORIZED);
    },
    AccountNotExist() {
        return new common_1.HttpException({
            message: "Account does not exist!",
            error: "AccountNotExist",
            statusCode: common_1.HttpStatus.FORBIDDEN,
        }, common_1.HttpStatus.FORBIDDEN);
    },
    AccountNotActive() {
        return new common_1.HttpException({
            message: "Account not active!",
            error: "AccountNotActive",
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
        }, common_1.HttpStatus.UNAUTHORIZED);
    },
    UserNotAuthorizedAccess() {
        return new common_1.HttpException({
            message: "Access Denied",
            error: "UnAuthorizedResourceError",
            statusCode: common_1.HttpStatus.FORBIDDEN,
        }, common_1.HttpStatus.FORBIDDEN);
    },
};
//# sourceMappingURL=auth.exception.js.map