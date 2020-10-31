import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginSuccessDto } from './dto/login.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiBody({ type: [LoginDto] })
  @ApiOkResponse({ type: [LoginSuccessDto] })
  @ApiUnauthorizedResponse()
  login(@Body() body: LoginDto) {
    return this.service.login(body);
  }
}
