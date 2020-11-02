import { HttpService, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { BaseCacheModule } from '.';
import { BaseBearerService } from './base-bearer.service';

describe('Clients Testings', () => {
  let service: BaseBearerService;
  let httpService: HttpService;
  const CLIENTS_MOCK_DATA = [{ id: '1' }, { id: '2' }, { id: '3' }];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BaseCacheModule],
      providers: [
        BaseBearerService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: REQUEST,
          useValue: {
            user: {
              token: '',
            },
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

    service = await moduleRef.resolve(BaseBearerService);
    httpService = moduleRef.get(HttpService);
  });

  it('Get clients on error', async done => {
    const mockObservable = {
      toPromise: () => {
        throw new InternalServerErrorException();
      },
    };
    jest.spyOn(httpService, 'get').mockImplementation(() => mockObservable as any);
    try {
      await service.getData();
    } catch (err) {
      expect(err).toBeInstanceOf(InternalServerErrorException);
      done();
    }
  });

  it('Get clients correctly', async () => {
    const mockObservable = {
      toPromise: () => ({
        headers: { etag: 'TEST_ETAG ' },
        data: CLIENTS_MOCK_DATA,
      }),
    };
    jest.spyOn(httpService, 'get').mockImplementation(() => mockObservable as any);
    expect(await service.getData()).toStrictEqual(CLIENTS_MOCK_DATA);
  });

  it('Get single client correctly', async () => {
    const mockObservable = {
      toPromise: () => ({
        headers: { etag: 'TEST_ETAG ' },
        data: CLIENTS_MOCK_DATA,
      }),
    };
    jest.spyOn(httpService, 'get').mockImplementation(() => mockObservable as any);
    expect(await service.get('1')).toStrictEqual(CLIENTS_MOCK_DATA[0]);
  });
});
