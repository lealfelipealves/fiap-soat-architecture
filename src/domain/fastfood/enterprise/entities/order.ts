import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { Status } from './value-objects'
import { OrderProductList } from './order-product-list'

export interface OrderProps {
  customerId: UniqueEntityID
  products: OrderProductList
  status: Status
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends AggregateRoot<OrderProps> {
  get customerId() {
    return this.props.customerId
  }

  set customerId(customerId: UniqueEntityID) {
    this.props.customerId = customerId
    this.touch()
  }

  get products() {
    return this.props.products
  }

  set products(products: OrderProductList) {
    this.props.products = products
    this.touch()
  }

  get status() {
    return this.props.status
  }

  set status(status: Status) {
    this.props.status = status
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<OrderProps, 'createdAt' | 'products' | 'status'>,
    id?: UniqueEntityID
  ) {
    const order = new Order(
      {
        ...props,
        products: props.products ?? new OrderProductList(),
        status: props.status ?? Status.create(Status.RECEIVED),
        createdAt: props.createdAt ?? new Date()
      },
      id
    )
    return order
  }
}
