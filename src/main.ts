import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppResultInterceptor } from "./app/app-result.interceptor";

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
    // app.enableCors({
    //   origin: [
    //     /^(.*)/,
    //   ],
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   preflightContinue: false,
    //   optionsSuccessStatus: 200,
    //   credentials: true,
    //   allowedHeaders:
    //     'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
    // });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Resume api')
    .setDescription('Resume api documentation')
    .setVersion('1.0')
    .addTag('resume')
    .build();
    const app = await NestFactory.create(AppModule, { cors: true })
        app.useGlobalInterceptors(new AppResultInterceptor());
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, document);
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');
  await app.listen(PORT, () => {
    console.log(new Date().toString());
    console.log(`Server start http://localhost:${PORT}`);
  });
  
}
bootstrap();
