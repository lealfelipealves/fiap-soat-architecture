import { OrderProduct } from '../../enterprise/entities/order-product'

export abstract class IOrderProductsRepository {
  abstract createMany(orderProduct: OrderProduct[]): Promise<void>
}
