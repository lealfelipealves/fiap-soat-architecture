import { PaginationParams } from '@/core/repositories/pagination-params'
import { Product } from '@/domain/fastfood/enterprise/entities'
import { IProductRepository } from '@/domain/fastfood/application/repositories/product-repository'

export class InMemoryProductsRepository implements IProductRepository {
  public items: Product[] = []

  async findById(id: string) {
    const product = this.items.find((item) => item.id.toString() === id)

    if (!product) {
      return null
    }

    return product
  }

  async findManyByCategory(category: string, { page }: PaginationParams) {
    const itemsPerPage = 10
    const filteredProducts = this.items.filter(
      (product) => product.category.getValue() === category
    )

    return filteredProducts.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    )
  }

  async create(product: Product) {
    this.items.push(product)
  }

  async save(product: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)

    this.items[itemIndex] = product
  }

  async delete(product: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)

    this.items.splice(itemIndex, 1)
  }
}
