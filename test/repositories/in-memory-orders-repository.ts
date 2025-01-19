import { IOrderRepository } from '@/domain/fastfood/application/repositories/order-repository'
import { Order } from '@/domain/fastfood/enterprise/entities'
import { InMemoryProductsRepository } from './in-memory-products-repository'
import { InMemoryOrderProductsRepository } from './in-memory-order-products-repository'
import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

export class InMemoryOrdersRepository implements IOrderRepository {
  public items: Order[] = []

  constructor(
    private orderProductsRepository: InMemoryOrderProductsRepository,
    private productsRepository: InMemoryProductsRepository
  ) {}

  async getAll({ page }: PaginationParams) {
    const itemsPerPage = 10
    const orders = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return orders
  }

  async create(order: Order) {
    this.items.push(order)

    await this.orderProductsRepository.createMany(order.products.getItems())

    DomainEvents.dispatchEventsForAggregate(order.id)
  }
}
