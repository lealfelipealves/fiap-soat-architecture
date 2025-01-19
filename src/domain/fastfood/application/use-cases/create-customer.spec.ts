import { CreateCustomerUseCase } from './create-customer'
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let sut: CreateCustomerUseCase

describe('Create Customer', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(inMemoryCustomersRepository)
  })

  it('should be able to create a customer', async () => {
    const result = await sut.execute({
      name: 'Customer 1',
      email: 'customer1@email.com'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCustomersRepository.items[0]).toEqual(result.value?.customer)
    expect(inMemoryCustomersRepository.items[0].name).toEqual('Customer 1')
    expect(inMemoryCustomersRepository.items[0].email?.toString()).toEqual(
      'customer1@email.com'
    )
  })

  it('should be able to create a anonymous customer', async () => {
    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    expect(inMemoryCustomersRepository.items[0].isAnonymous).toEqual(
      result.value?.customer.isAnonymous
    )
    expect(inMemoryCustomersRepository.items[0].name).toEqual('Anônimo')
    expect(inMemoryCustomersRepository.items[0].cpf?.toString()).toEqual(
      undefined
    )
    expect(inMemoryCustomersRepository.items[0].email?.toString()).toEqual(
      undefined
    )
  })
})
