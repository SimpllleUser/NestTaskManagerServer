import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Resume api')
    .setDescription('Resume api documentation')
    .setVersion('1.0')
    .addTag('resume')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, document);
  await app.listen(PORT, () =>
    console.log(`Server start http://localhost:${PORT}`),
  );
}
bootstrap();
