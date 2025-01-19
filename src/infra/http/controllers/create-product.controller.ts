import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { CreateProductUseCase } from '@/domain/fastfood/application/use-cases/create-product'
import { ProductPresenter } from '../presenters/product-presenter'

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Category } from '@/domain/fastfood/enterprise/entities/value-objects'

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z
    .string()
    .refine(
      (val) =>
        ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'].includes(val),
      {
        message:
          'Categoria inválida. As opções válidas são: Lanche, Acompanhamento, Bebida, Sobremesa.'
      }
    )
})

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

@ApiTags('Products')
@Controller('/products')
export class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create product' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'description', 'price', 'category'],
      properties: {
        name: { type: 'string', example: 'X-Bacon' },
        description: {
          type: 'string',
          example: 'Pão, hambúrguer, queijo, bacon, alface e tomate.'
        },
        price: { type: 'number', example: 15.5 },
        category: {
          type: 'string',
          enum: Category.VALID_CATEGORIES.slice()
        }
      }
    }
  })
  async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
    const { name, description, price, category } = body

    const result = await this.createProduct.execute({
      name,
      description,
      price,
      category
    })

    if (result.isLeft()) {
      throw new Error()
    }

    return { product: ProductPresenter.toHTTP(result.value.product) }
  }
}
