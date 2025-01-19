import { makeProduct } from 'test/factories/make-product'
import { GetProductByCategoryUseCase } from './get-product-by-category'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { Category } from '../../enterprise/entities/value-objects'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: GetProductByCategoryUseCase

describe('Get Product By Category', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new GetProductByCategoryUseCase(inMemoryProductsRepository)
  })

  it('should be able to get a product by category', async () => {
    const category = Category.create(Category.DRINK)
    const newProduct = makeProduct({
      category: category
    })
    await inMemoryProductsRepository.create(newProduct)

    const result = await sut.execute({
      category: Category.DRINK,
      page: 1
    })

    expect(result.value?.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          category: category
        })
      ])
    )
  })

  it('should return an empty array if no products match the category', async () => {
    const result = await sut.execute({
      category: 'Acompanhamento', // Categoria que não existe
      page: 1
    })

    expect(result.value?.products).toEqual([])
  })

  it('should handle paginated results correctly', async () => {
    for (let i = 0; i < 15; i++) {
      await inMemoryProductsRepository.create(
        makeProduct({
          category: Category.create('Sobremesa')
        })
      )
    }

    const page1 = await sut.execute({
      category: 'Sobremesa',
      page: 1
    })

    expect(page1.value?.products.length).toBe(10)

    const page2 = await sut.execute({
      category: 'Sobremesa',
      page: 2
    })

    expect(page2.value?.products.length).toBe(5)
  })
})
