import { Either, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
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
  constructor(private productRepository: ProductRepository) {}

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
