import { Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(body: LoginDto) {
    Logger.log(body);
  }
}
