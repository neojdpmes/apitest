import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginErrorDto, LoginSuccessDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  @ApiBody({ type: [LoginDto] })
  @ApiOkResponse({ type: [LoginSuccessDto] })
  @ApiUnauthorizedResponse({ type: [LoginErrorDto] })
  login(@Body() body: LoginDto) {
    return this.service.login(body);
  }
}
