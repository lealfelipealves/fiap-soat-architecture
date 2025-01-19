import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '@/domain/fastfood/enterprise/entities/order'

export abstract class IOrderRepository {
  abstract create(order: Order): Promise<void>
  abstract getAll(params: PaginationParams): Promise<Order[]>
}
