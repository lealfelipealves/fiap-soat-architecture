import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaCustomersRepository } from './prisma/repositories/prisma-customers-repository'
import { CustomerRepository } from '@/domain/fastfood/application/repositories/customer-repository'
import { ProductRepository } from '@/domain/fastfood/application/repositories/product-repository'
import { PrismaProductRepository } from './prisma/repositories/prisma-products-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomersRepository
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository
    }
  ],
  exports: [PrismaService, CustomerRepository, ProductRepository]
})
export class DatabaseModule {}
