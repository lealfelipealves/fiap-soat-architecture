import { Order as PrismaOrder, Prisma, OrderStatus } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/fastfood/enterprise/entities'
import { Status } from '@/domain/fastfood/enterprise/entities/value-objects'

export class PrismaOrdersMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        customerId: new UniqueEntityID(raw.customerId),
        status: Status.create(raw.status),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      customerId: order.customerId.toString(),
      status: order.status.toString() as OrderStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }
  }
}
