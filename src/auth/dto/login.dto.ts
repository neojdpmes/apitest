import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginSuccessDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  expires_in: number;
}
