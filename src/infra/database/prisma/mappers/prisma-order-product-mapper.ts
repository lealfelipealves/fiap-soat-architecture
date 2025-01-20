import { Prisma, OrderProduct as PrismaOrderProduct } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderProduct } from '@/domain/fastfood/enterprise/entities/order-product'

export class PrismaOrderProductMapper {
  static toDomain(raw: PrismaOrderProduct): OrderProduct {
    if (!raw.orderId) {
      throw new Error('Invalid order type.')
    }

    return OrderProduct.create(
      {
        productId: new UniqueEntityID(raw.id),
        orderId: new UniqueEntityID(raw.orderId)
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(
    products: OrderProduct[]
  ): Prisma.OrderProductCreateManyOrderInputEnvelope {
    return {
      data: products.map((product) => ({
        orderId: product.orderId.toString(), // Cada produto terá o mesmo orderId
        productId: product.productId.toString() // Associando o productId de cada produto
      }))
    }
  }

  // static toPrismaUpdateMany(
  //   products: OrderProduct[]
  // ): Prisma.OrderProductUpdateManyArgs {
  //   const productIds = products.map((product) => {
  //     return product.productId.toString()
  //   })

  //   return {
  //     where: {
  //       id: {
  //         in: productIds
  //       }
  //     },
  //     data: {
  //       orderId: products[0].orderId.toString()
  //     }
  //   }
  // }
}
