import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(dto: CreateSaleDto) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: dto.productId } });
      if (!product) throw new NotFoundException('Product not found');

      if (product.stockQuantity < dto.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      const totalPrice = product.price * dto.quantity;

      await tx.product.update({
        where: { id: product.id },
        data: { stockQuantity: product.stockQuantity - dto.quantity },
      });

      const sale = await tx.sale.create({
        data: {
          productId: product.id,
          quantity: dto.quantity,
          totalPrice,
        },
      });

      return { sale, updatedStock: product.stockQuantity - dto.quantity };
    });
  }

  listSales() {
    return this.prisma.sale.findMany({
      orderBy: { createdAt: 'desc' },
      include: { product: true },
    });
  }
}
