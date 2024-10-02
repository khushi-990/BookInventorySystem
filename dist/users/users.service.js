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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const exceptions_1 = require("../common/helpers/exceptions");
const logger_service_1 = require("../common/logger/logger.service");
const user_schema_1 = require("../users/schemas/user.schema");
const response_constant_1 = require("../common/constants/response.constant");
const encrypt_service_1 = require("../services/encrypt.service");
const User_enum_1 = require("./enum/User.enum");
let UsersService = UsersService_1 = class UsersService {
    constructor(userModel, myLogger, configService, encryptPasswordService) {
        this.userModel = userModel;
        this.myLogger = myLogger;
        this.configService = configService;
        this.encryptPasswordService = encryptPasswordService;
        this.myLogger.setContext(UsersService_1.name);
    }
    async create(createUserDto) {
        if (await this.getUserByEmail(createUserDto.email)) {
            throw exceptions_1.TypeExceptions.AlreadyExistsCommonFunction(response_constant_1.RESPONSE_ERROR.USER_ALREADY_EXIST);
        }
        const password = await this.encryptPasswordService.encryptPassword(createUserDto.password);
        const gender = User_enum_1.GenderEnum[createUserDto.gender];
        console.log("🚀 ~ UsersService ~ create ~ gender:", gender);
        return await this.userModel.create(Object.assign(Object.assign({}, createUserDto), { password, gender }));
    }
    async createInitialUser() {
        const user = await this.getUserByEmail(this.configService.get("database.initialUser.email"));
        if (user) {
            this.myLogger.customLog("Initial user already loaded.");
        }
        else {
            const params = {
                firstName: this.configService.get("database.initialUser.firstName"),
                lastName: this.configService.get("database.initialUser.lastName"),
                gender: this.configService.get("database.initialUser.gender"),
                email: this.configService.get("database.initialUser.email"),
                password: "",
                isActive: true,
            };
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(this.configService.get("database.initialUser.password"), salt);
            params.password = hash;
            await this.userModel.create(params);
            this.myLogger.log("Initial user loaded successfully.");
        }
    }
    async login(params) {
        const user = await this.userModel.findOne({
            email: params.email,
        });
        if (!user) {
            throw exceptions_1.AuthExceptions.AccountNotExist();
        }
        if (!user.isActive) {
            throw exceptions_1.AuthExceptions.AccountNotActive();
        }
        if (!await this.encryptPasswordService.comparePassword(params.password, user.password)) {
            throw exceptions_1.AuthExceptions.InvalidPassword();
        }
        delete user.password;
        delete user.__v;
        return user;
    }
    async getUserByEmail(email) {
        return await this.userModel.findOne({
            email: email,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        logger_service_1.LoggerService,
        config_1.ConfigService,
        encrypt_service_1.EncryptPasswordService])
], UsersService);
//# sourceMappingURL=users.service.js.map