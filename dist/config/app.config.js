"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("express", () => ({
    env: process.env.APP_ENV,
    version: process.env.APP_VERSION,
    name: process.env.APP_NAME,
    description: `BookInventoryManagemnet system Project`,
    url: process.env.APP_URL,
    port: process.env.APP_PORT || 3000,
    environment: process.env.APP_ENV || "development",
    enableCors: process.env.APP_ENABLE_CORS ? process.env.APP_ENABLE_CORS : false,
    throttler: {
        ttlTime: process.env.APP_THROTTLER_TTL_TIME
            ? process.env.APP_THROTTLER_TTL_TIME
            : 60,
        requestCount: process.env.APP_THROTTLER_REQUEST_COUNT
            ? process.env.APP_THROTTLER_REQUEST_COUNT
            : 10,
    },
}));
//# sourceMappingURL=app.config.js.map