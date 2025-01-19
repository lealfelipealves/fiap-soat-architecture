import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { GetCustomerByCpfController } from './controllers/get-customer-by-cpf.controller'
import { GetCustomerByCpfUseCase } from '@/domain/fastfood/application/use-cases/get-customer-by-cpf'
import { CreateCustomerUseCase } from '@/domain/fastfood/application/use-cases/create-customer'
import { CreateCustomerController } from './controllers/create-customer.controller'
@Module({
  imports: [DatabaseModule],
  controllers: [GetCustomerByCpfController, CreateCustomerController],
  providers: [GetCustomerByCpfUseCase, CreateCustomerUseCase]
})
export class HttpModule {}
