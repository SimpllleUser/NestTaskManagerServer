import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppResultInterceptor } from './app/app-result.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentation API')
    .setDescription('It`s documentation API for TaskManager app server')
    .setVersion('1.0')
    .addTag('Documentation')
    .build();
  const app = await NestFactory.create(AppModule, { cors: true });
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
