import { OrderProduct } from '../../enterprise/entities/order-product'

export abstract class OrderProductsRepository {
  abstract createMany(products: OrderProduct[]): Promise<void>
  //abstract deleteMany(products: OrderProduct[]): Promise<void>
  //abstract findManyByOrderId(orderId: string): Promise<OrderProduct[]>
  //abstract deleteManyByOrderIdd(orderId: string): Promise<void>
}
