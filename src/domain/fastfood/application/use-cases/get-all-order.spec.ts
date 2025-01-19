import { GetAllOrderUseCase } from './get-all-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { InMemoryOrderProductsRepository } from 'test/repositories/in-memory-order-products-repository'
import { makeProduct } from 'test/factories/make-product'
import { makeOrderProduct } from 'test/factories/make-order-product'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryOrderProductsRepository: InMemoryOrderProductsRepository
let sut: GetAllOrderUseCase

describe('Get All Orders Use Case', () => {
  beforeEach(() => {
    inMemoryOrderProductsRepository = new InMemoryOrderProductsRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryOrderProductsRepository,
      inMemoryProductsRepository
    )
    sut = new GetAllOrderUseCase(inMemoryOrdersRepository)
  })

  it('should return all orders', async () => {
    // const product2 = makeProduct({})
    // const product3 = makeProduct({})
    // const product4 = makeProduct({})

    // await inMemoryProductsRepository.create(product2)
    // await inMemoryProductsRepository.create(product3)
    // await inMemoryProductsRepository.create(product4)

    const newOrder1 = makeOrder({
      id: new UniqueEntityID('1'),
      customerId: new UniqueEntityID('1')
    })

    const product1 = makeProduct({})

    inMemoryProductsRepository.items.push(product1)

    inMemoryOrderProductsRepository.items.push(
      makeOrderProduct({ productId: product1.id, orderId: newOrder1.id })
    )

    // const newOrder2 = makeOrder({
    //   id: new UniqueEntityID('2'),
    //   customerId: new UniqueEntityID('2')
    // })
    // const newOrder3 = makeOrder({
    //   id: new UniqueEntityID('3'),
    //   customerId: new UniqueEntityID('31')
    // })

    //await inMemoryOrdersRepository.create(newOrder1)
    // await inMemoryOrdersRepository.create(newOrder2)
    // await inMemoryOrdersRepository.create(newOrder3)

    // inMemoryOrderProductsRepository.items.push(
    //   makeOrderProduct({ productId: product1.id, orderId: newOrder1.id })
    // )
    // inMemoryOrderProductsRepository.items.push(
    //   makeOrderProduct({ productId: product2.id, orderId: newOrder1.id })
    // )

    // inMemoryOrderProductsRepository.items.push(
    //   makeOrderProduct({ productId: product1.id, orderId: newOrder2.id })
    // )
    // inMemoryOrderProductsRepository.items.push(
    //   makeOrderProduct({ productId: product3.id, orderId: newOrder2.id })
    // )

    // inMemoryOrderProductsRepository.items.push(
    //   makeOrderProduct({ productId: product2.id, orderId: newOrder3.id })
    // )
    // inMemoryOrderProductsRepository.items.push(
    //   makeOrderProduct({ productId: product3.id, orderId: newOrder3.id })
    // )

    const result = await sut.execute({
      page: 1
    })

    expect(result.value).toMatchObject({
      orders: expect.objectContaining({
        id: '1',
        products: [
          expect.objectContaining({
            productId: product1.id
          })
        ]
      })
    })
  })

  it('should return paginated orders', async () => {
    // Cria 15 pedidos simulados
    for (let i = 0; i < 15; i++) {
      await inMemoryOrdersRepository.create(
        makeOrder({ id: new UniqueEntityID(`${i}`) })
      )
    }

    const page1 = await sut.execute({ page: 1 })
    const page2 = await sut.execute({ page: 2 })

    expect(page1.value?.orders.length).toBe(10) // Primeira página deve ter 10 pedidos
    expect(page2.value?.orders.length).toBe(5) // Segunda página deve ter os 5 restantes
  })

  it('should return an empty array when there are no orders', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.value?.orders).toEqual([])
  })
})
