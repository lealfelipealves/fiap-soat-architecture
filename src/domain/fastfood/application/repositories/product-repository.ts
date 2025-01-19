import { Product } from '@/domain/fastfood/enterprise/entities/product'
import { CategoryType } from '../../enterprise/entities/value-objects'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class IProductRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findManyByCategory(
    category: string,
    params?: PaginationParams
  ): Promise<Product[]>
  abstract save(product: Product): Promise<void>
  abstract create(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}
