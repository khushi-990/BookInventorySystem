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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const book_schema_1 = require("./schemas/book.schema");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../common/services/common.service");
const response_constant_1 = require("../common/constants/response.constant");
let BookService = class BookService {
    constructor(bookModel, commonService) {
        this.bookModel = bookModel;
        this.commonService = commonService;
    }
    async create(createBookDto) {
        return await this.bookModel.create(createBookDto);
    }
    async listBooks(body) {
        const limit = body.limit ? Number(body.limit) : 10;
        const page = body.page ? Number(body.page) : 1;
        const skip = (page - 1) * limit;
        const aggregateQuery = [];
        aggregateQuery.push({
            $project: {
                title: "$title",
                author: "$author",
                price: "$price",
                level: "$level",
                publishedDate: "$publishedDate",
                isStock: "$isStock",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt",
            },
        });
        if (body.search) {
            const searchText = body.search;
            const regex = new RegExp(searchText, "i");
            aggregateQuery.push({
                $match: {
                    $or: [
                        {
                            title: {
                                $regex: regex,
                            },
                        },
                    ],
                },
            });
        }
        const sortDir = body.sort_order && body.sort_order.includes('asc') ? 1 : -1;
        aggregateQuery.push({
            $sort: { [body.sort_by ? `${body.sort_by}` : 'createdAt']: sortDir },
        });
        aggregateQuery.push({
            $facet: {
                total_records: [{ $count: "count" }],
                topicList: [{ $skip: skip }, { $limit: limit }],
            },
        });
        const BookList = await this.bookModel
            .aggregate(aggregateQuery)
            .exec();
        if (BookList) {
            BookList[0].total_records =
                BookList[0].total_records.length > 0
                    ? BookList[0].total_records[0].count
                    : 0;
        }
        return BookList;
    }
    async deleteBook(body) {
        return await this.commonService.deleteById(this.bookModel, body._id, response_constant_1.RESPONSE_ERROR.BOOK_DELETED);
    }
    async findOne(_id) {
        return await this.commonService.getDetails(this.bookModel, _id, response_constant_1.RESPONSE_ERROR.BOOK_NOT_FOUND);
    }
    async update(bookId, updateBookDto) {
        await this.bookModel.findOneAndUpdate({ _id: bookId }, updateBookDto);
        return {};
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Books.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        common_service_1.CommonService])
], BookService);
//# sourceMappingURL=book.service.js.map