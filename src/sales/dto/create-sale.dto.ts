import { IsInt, IsString, Min } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
