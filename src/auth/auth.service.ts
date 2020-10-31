import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  async login(body: LoginDto) {
    try {
      const response = await this.httpService.post('login', body).toPromise();
      return response.data;
    } catch (err) {
      throw new UnauthorizedException({ message: 'Credenciales inválidas.' });
    }
  }
}
