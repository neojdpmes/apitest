import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService, 
    private readonly jwtService: JwtService) {}

  login(body: LoginDto) {
    if (this.validateUser(body)) {
      return { 
        token: this.jwtService.sign({ username: body.username }),
        type: 'Bearer',
        "expires_in": this.config.get('jwt.expiration')
      };
    } else throw new UnauthorizedException({ message: 'Invalid credentials.' });
  }

  validateUser({username, password}: LoginDto): boolean {
    // Simulating a database user
    return (username === 'test' && password === 'test1234');
  }

}
