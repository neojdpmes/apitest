import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class PolicyDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amountInsured: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  inceptionDate: string;

  @ApiProperty()
  installmentPayment: boolean;
}

export class PolicyQuery {
  @ApiPropertyOptional( {type: Number })
  @IsOptional()
  @Type(() => Number )
  @IsNumber()
  limit = 10;
}
