import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
  @ApiProperty()
  @Type(() => Number)
  limit = 10;
}
