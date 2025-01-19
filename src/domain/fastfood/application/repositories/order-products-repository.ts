import { OrderProduct } from '../../enterprise/entities/order-product'

export abstract class OrderProductsRepository {
  abstract createMany(orderProduct: OrderProduct[]): Promise<void>
}
