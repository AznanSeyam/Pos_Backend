import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    try {
      return await this.prisma.product.create({ data: dto });
    } catch (e) {
      throw new BadRequestException('SKU must be unique (already exists)');
    }
  }

  list() {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async update(id: string, dto: UpdateProductDto) {
    const exists = await this.prisma.product.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Product not found');

    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.product.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Product not found');

    await this.prisma.product.delete({ where: { id } });
    return { deleted: true };
  }
}
