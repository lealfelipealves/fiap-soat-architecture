import { Either, left, right } from '@/core/either'
import { IProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteProductUseCaseRequest {
  productId: string
}

type DeleteProductUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    productId
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    if (productId !== product.id.toString()) {
      return left(new NotAllowedError())
    }

    await this.productRepository.delete(product)

    return right(null)
  }
}
