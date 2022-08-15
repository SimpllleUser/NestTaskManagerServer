"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const app_result_interceptor_1 = require("./app/app-result.interceptor");
async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Documentation API')
        .setDescription('It`s documentation API for TaskManager app server')
        .setVersion('1.0')
        .addTag('Documentation')
        .build();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalInterceptors(new app_result_interceptor_1.AppResultInterceptor());
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/api/swagger', app, document);
    await app.listen(PORT, () => {
        console.log(new Date().toString());
        console.log(`Server start http://localhost:${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map