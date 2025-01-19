import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaCustomersRepository } from './prisma/repositories/prisma-customers-repository'
import { CustomerRepository } from '@/domain/fastfood/application/repositories/customer-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomersRepository
    }
  ],
  exports: [PrismaService, CustomerRepository]
})
export class DatabaseModule {}
