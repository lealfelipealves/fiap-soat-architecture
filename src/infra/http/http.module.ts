import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { GetCustomerByCpfController } from './controllers/get-customer-by-cpf.controller'
import { GetCustomerByCpfUseCase } from '@/domain/fastfood/application/use-cases/get-customer-by-cpf'
@Module({
  imports: [DatabaseModule],
  controllers: [GetCustomerByCpfController],
  providers: [GetCustomerByCpfUseCase]
})
export class HttpModule {}
