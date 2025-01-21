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
    .setTitle('Fast food API')
    .setDescription(
      'FIAP - Software Architecture - Tech Challenge - FASE 01<br>Grupo 30 - Felipe Alves Leal<br> Sistema de fast food API '
    )
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory)

  await app.listen(port)
}
bootstrap()
