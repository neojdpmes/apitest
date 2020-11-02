import { HttpService, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('Auth Testings', () => {
  let controller: AuthController;
  let service: AuthService;
  const loginData: LoginDto = { username: 'test', password: 'test' };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
    controller = moduleRef.get<AuthController>(AuthController);
  });

  it('Login Unauthorized', async done => {
    try {
      await controller.login(loginData);
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
      done();
    }
  });

  it('Login Mock', async () => {
    const loginData: LoginDto = { username: 'test', password: 'test' };
    const result = {
      token: 'Test Token',
      type: 'Bearer',
      "expires_in": '3600s',
    };
    jest.spyOn(service, 'login').mockImplementation(() => result);
    expect(await controller.login(loginData)).toBe(result);
  });
});
