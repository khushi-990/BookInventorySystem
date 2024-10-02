"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./common/logger/logger.service");
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
const helmet_1 = require("helmet");
const enum_constant_1 = require("./common/constants/enum.constant");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const appConfig = configService.get("express");
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(appConfig.name)
        .setDescription(appConfig.description)
        .setVersion(appConfig.version)
        .addServer("/")
        .addServer("/BookInventorySystem")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    if (appConfig.environment != enum_constant_1.AppEnvironment.PRODUCTION) {
        swagger_1.SwaggerModule.setup("/", app, document);
    }
    app.useLogger(new logger_service_1.LoggerService());
    app.use((0, helmet_1.default)());
    if (appConfig.enableCors) {
        app.enableCors();
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(appConfig.port);
}
bootstrap();
//# sourceMappingURL=main.js.map