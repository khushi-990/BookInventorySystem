"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const User_enum_1 = require("../users/enum/User.enum");
const book_service_1 = require("./book.service");
const response_decorator_1 = require("../common/decorators/response.decorator");
const response_constant_1 = require("../common/constants/response.constant");
const book_dto_1 = require("./dto/book.dto");
const common_dto_1 = require("../common/dto/common.dto");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    create(createBookDto) {
        return this.bookService.create(createBookDto);
    }
    findAll(body) {
        return this.bookService.listBooks(body);
    }
    deleteBook(body) {
        return this.bookService.deleteBook(body);
    }
    getDetailsProduct(body) {
        return this.bookService.findOne(body._id);
    }
    update(id, updateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Post)("create"),
    (0, response_decorator_1.ResponseMessage)(response_constant_1.RESPONSE_SUCCESS.BOOK_INSERTED),
    (0, swagger_1.ApiOperation)({
        description: `
    This API will be used for creating new Book using the admin panel.`,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/list"),
    (0, response_decorator_1.ResponseMessage)(response_constant_1.RESPONSE_SUCCESS.BOOK_LISTED),
    (0, swagger_1.ApiOperation)({ summary: 'Admin can review all Books' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("/deleteBook"),
    (0, response_decorator_1.ResponseMessage)(response_constant_1.RESPONSE_SUCCESS.BOOK_DELETED),
    (0, swagger_1.ApiOperation)({ summary: 'Admin can review all Books' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.DetailsBasedOnIdDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Post)("/getDetails"),
    (0, response_decorator_1.ResponseMessage)(response_constant_1.RESPONSE_SUCCESS.BOOK_LISTED),
    (0, swagger_1.ApiOperation)({ summary: 'Admin can review based on Id Book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.DetailsBasedOnIdDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getDetailsProduct", null);
__decorate([
    (0, common_1.Patch)("update/:id"),
    (0, response_decorator_1.ResponseMessage)(response_constant_1.RESPONSE_SUCCESS.BOOK_UPDATED),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "update", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('book'),
    (0, roles_decorator_1.Roles)(User_enum_1.UserTypeEnum.Admin),
    (0, swagger_1.ApiTags)("Book Management"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map