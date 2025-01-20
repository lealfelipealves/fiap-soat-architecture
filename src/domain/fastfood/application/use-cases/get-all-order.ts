import { Either, right } from '@/core/either'
import { Order } from '@/domain/fastfood/enterprise/entities'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'

type GetAllOrderUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

@Injectable()
export class GetAllOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<GetAllOrderUseCaseResponse> {
    const orders = await this.orderRepository.getAll()

    return right({
      orders
    })
  }
}
