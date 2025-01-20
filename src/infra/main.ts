import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  const configService = app.get(EnvService)
  const port = configService.get('APP_PORT')

  const config = new DocumentBuilder()
    .setTitle('Fastfood')
    .setDescription('The fastfood API - FIAP Tech Challenge - FASE 01')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(port)
}
bootstrap()
