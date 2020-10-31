import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
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
  @ApiPropertyOptional( {type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit = 10;

  @ApiPropertyOptional( {type: String })
  @IsOptional()
  @IsString()
  name = '';
}
