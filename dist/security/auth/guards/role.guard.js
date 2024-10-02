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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("../../../common/constants");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const exceptions_1 = require("../../../common/helpers/exceptions");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEYS, [context.getHandler(), context.getClass()]);
        const isPublic = this.reflector.getAllAndOverride(constants_1.AUTH_IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            console.log("role is requires");
            return true;
        }
        if (isPublic) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const roleGuard = requiredRoles.some((role) => user.userType == role);
        if (!roleGuard) {
            throw exceptions_1.AuthExceptions.UserNotAuthorizedAccess();
        }
        else {
            return roleGuard;
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=role.guard.js.map