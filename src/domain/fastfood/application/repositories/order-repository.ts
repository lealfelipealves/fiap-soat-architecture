import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '@/domain/fastfood/enterprise/entities/order'

export abstract class OrderRepository {
  abstract getAll(): Promise<Order[]>
  //abstract save(order: Order): Promise<void>
  abstract create(order: Order): Promise<void>
  //abstract delete(order: Order): Promise<void>
}
