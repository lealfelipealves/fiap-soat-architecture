import { IOrderProductsRepository } from '@/domain/fastfood/application/repositories/order-products-repository'
import { OrderProduct } from '@/domain/fastfood/enterprise/entities/order-product'

export class InMemoryOrderProductsRepository
  implements IOrderProductsRepository
{
  public items: OrderProduct[] = []

  async createMany(orderProduct: OrderProduct[]): Promise<void> {
    this.items.push(...orderProduct)
  }
}
