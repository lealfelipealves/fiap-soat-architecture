import { ICustomerRepository } from '@/domain/fastfood/application/repositories/customer-repository'
import { Customer } from '@/domain/fastfood/enterprise/entities'
import { Email } from '@/domain/fastfood/enterprise/entities/value-objects'
import { Either, right } from '@/core/either'

interface CreateCustomerUseCaseRequest {
  name?: string
  email?: string
}

type CreateCustomerUseCaseResponse = Either<
  null,
  {
    customer: Customer
  }
>

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute({
    name,
    email
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const emailValueObject = email ? Email.create(email) : undefined

    const customer = Customer.create({
      name: name,
      email: emailValueObject
    })

    await this.customerRepository.create(customer)

    return right({
      customer
    })
  }
}
