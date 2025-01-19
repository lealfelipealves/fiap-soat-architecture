import { Either, right } from '@/core/either'
import { Order } from '@/domain/fastfood/enterprise/entities'
import { IOrderRepository } from '../repositories/order-repository'

interface GetAllOrderUseCaseRequest {
  page: number
}

type GetAllOrderUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

export class GetAllOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute({
    page
  }: GetAllOrderUseCaseRequest): Promise<GetAllOrderUseCaseResponse> {
    const orders = await this.orderRepository.getAll({ page })

    return right({
      orders
    })
  }
}
