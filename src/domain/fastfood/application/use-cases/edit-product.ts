import { IProductRepository } from '@/domain/fastfood/application/repositories/product-repository'
import { Product } from '@/domain/fastfood/enterprise/entities'
import { Category } from '@/domain/fastfood/enterprise/entities/value-objects'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface EditProductUseCaseRequest {
  productId: string
  name: string
  description: string
  price: number
  category: string
}

type EditProductUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    product: Product
  }
>

export class EditProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute({
    productId,
    name,
    description,
    price,
    category
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.name = name
    product.description = description
    product.price = price
    product.category = category

    await this.productRepository.save(product)

    return right({
      product
    })
  }
}
