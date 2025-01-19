import { Either, right } from '@/core/either'
import { Order } from '@/domain/fastfood/enterprise/entities'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'

interface GetAllOrderUseCaseRequest {
  page: number
}

type GetAllOrderUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

@Injectable()
export class GetAllOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({
    page
  }: GetAllOrderUseCaseRequest): Promise<GetAllOrderUseCaseResponse> {
    const orders = await this.orderRepository.getAll({ page })

    return right({
      orders
    })
  }
}
