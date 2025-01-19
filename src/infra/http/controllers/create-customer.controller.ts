import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { CreateCustomerUseCase } from '@/domain/fastfood/application/use-cases/create-customer'
import { CustomerPresenter } from '../presenters/customer-presenter'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createCustomerBodySchema = z.object({
  name: z.string(),
  email: z.string().email()
})

const bodyValidationPipe = new ZodValidationPipe(createCustomerBodySchema)

type CreateCustomerBodySchema = z.infer<typeof createCustomerBodySchema>

@Controller('/customers/:cpf')
export class CreateCustomerController {
  constructor(private createCustomer: CreateCustomerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('cpf') cpf: string,
    @Body(bodyValidationPipe) body: CreateCustomerBodySchema
  ) {
    const { email, name } = body
    const result = await this.createCustomer.execute({
      cpf,
      email,
      name
    })

    if (result.isLeft()) {
      throw new Error()
    }

    return { customer: CustomerPresenter.toHTTP(result.value.customer) }
  }
}
