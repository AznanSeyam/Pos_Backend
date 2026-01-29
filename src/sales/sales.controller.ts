import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sales.service';

@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private sales: SalesService) {}

  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.sales.createSale(dto);
  }

  @Get()
  list() {
    return this.sales.listSales();
  }
}
