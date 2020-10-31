import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  client_secret: string;
}

export class LoginErrorDto {
  @ApiProperty()
  message: string;
}

export class LoginSuccessDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  type: string;
}
