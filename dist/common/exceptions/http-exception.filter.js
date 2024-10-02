"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../helpers/exceptions");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        var _a, _b, _c, _d;
        console.log("🚀 ~ HttpExceptionFilter ~ exception:", exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (!((_a = exception === null || exception === void 0 ? void 0 : exception.response) === null || _a === void 0 ? void 0 : _a.error)) {
            console.log("error", (_b = exception === null || exception === void 0 ? void 0 : exception.response) === null || _b === void 0 ? void 0 : _b.error);
            exception = exceptions_1.CustomError.UnknownError();
        }
        let statusCode = this.getStatus(exception);
        let message = this.extractMessage(exception);
        if (((_c = exception === null || exception === void 0 ? void 0 : exception.response) === null || _c === void 0 ? void 0 : _c.message) &&
            ((_d = exception === null || exception === void 0 ? void 0 : exception.response) === null || _d === void 0 ? void 0 : _d.error) === "Bad Request") {
            statusCode = common_1.HttpStatus.BAD_REQUEST;
            message = exception.response.message;
        }
        const body = this.createResponseBody(statusCode, message, request.url);
        this.logger.warn(`${statusCode} - ${message} - ${request.method} ${request.url}`);
        response.status(statusCode).json(body);
    }
    getStatus(exception) {
        if (exception instanceof common_1.HttpException) {
            return exception.getStatus();
        }
        return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    extractMessage(exception) {
        if (exception instanceof common_1.HttpException) {
            return exception.message || "Unexpected error occurred";
        }
        return exception.message || "An unknown error occurred";
    }
    createResponseBody(statusCode, message, url) {
        return {
            statusCode,
            message,
            timestamp: new Date().toISOString(),
            endpoint: url,
        };
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map