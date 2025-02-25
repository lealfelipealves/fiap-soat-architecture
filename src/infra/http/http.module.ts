import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { GetCustomerByCpfController } from './controllers/get-customer-by-cpf.controller'
import { GetCustomerByCpfUseCase } from '@/domain/fastfood/application/use-cases/get-customer-by-cpf'
import { CreateCustomerUseCase } from '@/domain/fastfood/application/use-cases/create-customer'
import { CreateCustomerController } from './controllers/create-customer.controller'
import { CreateProductUseCase } from '@/domain/fastfood/application/use-cases/create-product'
import { EditProductUseCase } from '@/domain/fastfood/application/use-cases/edit-product'
import { DeleteProductUseCase } from '@/domain/fastfood/application/use-cases/delete-product'
import { CreateProductController } from './controllers/create-product.controller'
import { EditProductController } from './controllers/edit-product.controller'
import { DeleteProductController } from './controllers/delete-product.controller'
import { GetProductByCategoryController } from './controllers/get-product-by-category.controller'
import { GetProductByCategoryUseCase } from '@/domain/fastfood/application/use-cases/get-product-by-category'
import { CreateOrderController } from './controllers/create-order.controller'
import { CreateOrderUseCase } from '@/domain/fastfood/application/use-cases/create-order'
import { GetAllOrderController } from './controllers/get-all-order.controller'
import { GetAllOrderUseCase } from '@/domain/fastfood/application/use-cases/get-all-order'
import { CheckoutOrderController } from './controllers/checkout-order.controller'
import { CheckoutOrderUseCase } from '@/domain/fastfood/application/use-cases/checkout-order'
@Module({
  imports: [DatabaseModule],
  controllers: [
    GetCustomerByCpfController,
    CreateCustomerController,
    GetProductByCategoryController,
    CreateProductController,
    EditProductController,
    DeleteProductController,
    GetAllOrderController,
    CreateOrderController,
    CheckoutOrderController
  ],
  providers: [
    GetCustomerByCpfUseCase,
    CreateCustomerUseCase,
    CreateProductUseCase,
    EditProductUseCase,
    DeleteProductUseCase,
    GetProductByCategoryUseCase,
    GetAllOrderUseCase,
    CreateOrderUseCase,
    CheckoutOrderUseCase
  ]
})
export class HttpModule {}
