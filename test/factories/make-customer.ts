import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Customer, CustomerProps } from '@/domain/fastfood/enterprise/entities'
import { Cpf, Email } from '@/domain/fastfood/enterprise/entities/value-objects'
import { makeCpf } from './make-cpf'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueEntityID
) {
  const customer = Customer.create(
    {
      name: faker.person.firstName(),
      email: Email.create(faker.internet.email()),
      ...override
    },
    id
  )

  return customer
}
