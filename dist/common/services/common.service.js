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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const exceptions_1 = require("../helpers/exceptions");
let CommonService = class CommonService {
    constructor() { }
    async getDetails(model, id, notFoundMessage) {
        const details = await model.findOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        if (!details) {
            throw exceptions_1.TypeExceptions.NotFoundCommonFunction(notFoundMessage);
        }
        return details;
    }
    async deleteById(model, id, notFoundMessage) {
        const deletedDocument = await model.findOneAndDelete({ _id: id });
        if (!deletedDocument) {
            throw exceptions_1.TypeExceptions.NotFoundCommonFunction(notFoundMessage);
        }
        return deletedDocument;
    }
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CommonService);
//# sourceMappingURL=common.service.js.map