import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PolicyDataDto } from 'src/policies/dto/policies.dto';

export class ClientDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty({ type: [PolicyDataDto] })
  policies: PolicyDataDto[];
}

export class ClientQuery {
  @ApiProperty()
  @Type(() => Number)
  limit = 10;

  @ApiPropertyOptional()
  name?: string;
}
