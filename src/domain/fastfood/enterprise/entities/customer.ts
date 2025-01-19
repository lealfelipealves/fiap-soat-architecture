import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Cpf, Email } from './value-objects'

export interface CustomerProps {
  cpf?: Cpf
  name?: string
  email?: Email
  isAnonymous: boolean
}

export class Customer extends Entity<CustomerProps> {
  get cpf() {
    return this.props.cpf
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get isAnonymous() {
    return this.props.isAnonymous
  }

  static create(
    props: Optional<CustomerProps, 'cpf' | 'name' | 'email' | 'isAnonymous'>,
    id?: UniqueEntityID
  ) {
    const isAnonymous = !props.cpf && !props.email && !props.name

    const customer = new Customer(
      {
        ...props,
        cpf: props.cpf ? Cpf.create(props.cpf.getValue()) : undefined,
        name: props.name ?? (isAnonymous ? 'Anônimo' : undefined),
        email: props.email ? Email.create(props.email.toString()) : undefined,
        isAnonymous
      },
      id
    )

    return customer
  }
}
