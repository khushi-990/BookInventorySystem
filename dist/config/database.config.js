"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("database", () => ({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 27017,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    initialUser: {
        firstName: "Mind",
        lastName: "Inventory",
        gender: 0,
        email: "inquiry@yopmail.com",
        password: "mindinventory@123",
    },
    mongo: {
        connectionString: process.env.DATABASE_CONNECTION,
    },
}));
//# sourceMappingURL=database.config.js.map