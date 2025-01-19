import { Either, right } from '@/core/either'
import { IProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Product } from '../../enterprise/entities'

interface GetProductByCategoryUseCaseRequest {
  category: string
  page: number
}

type GetProductByCategoryUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>
export class GetProductByCategoryUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    category,
    page
  }: GetProductByCategoryUseCaseRequest): Promise<GetProductByCategoryUseCaseResponse> {
    const products = await this.productRepository.findManyByCategory(category, {
      page
    })

    return right({
      products
    })
  }
}
