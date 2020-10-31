import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService, 
    private readonly jwtService: JwtService, 
    private readonly httpService: HttpService) {}

  login(body: LoginDto) {
    if (this.validateUser(body)) {
      return { token: this.jwtService.sign({ username: body.username } )};
    } else throw new UnauthorizedException({ message: 'Invalid credentials.' });
  }

  validateUser({username, password}: LoginDto): boolean {
    // Simulating a database user
    return (username === 'test' && password === 'test1234');
  }

  async getApiToken() {
    const response = await this.httpService.post('login', {
      "client_id": this.config.get('application.clientId'),
      "client_secret": this.config.get('application.clientSecret'),
    }).toPromise();
    return response.data.token;
  }

}
