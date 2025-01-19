import { Customer } from '@/domain/fastfood/enterprise/entities/customer'

export class CustomerPresenter {
  static toHTTP(customer: Customer) {
    return {
      cpf: customer.cpf?.toFormattedString(),
      name: customer.name,
      email: customer.email?.toString()
    }
  }
}
