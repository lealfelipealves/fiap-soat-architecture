import { Order } from '@/domain/fastfood/enterprise/entities'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      customerId: order.customerId.toString(),
      status: order.status.toString(),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }
  }
}
