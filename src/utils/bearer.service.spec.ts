import { CACHE_MANAGER, HttpService, Inject, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { BaseCacheModule } from '.';
import { ClientDataDto } from '../clients/dto/clients.dto';
import { PolicyDataDto } from '../policies/dto/policies.dto';
import { BaseBearerService } from './base-bearer.service';


class BaseBearerTestingService extends BaseBearerService<ClientDataDto | PolicyDataDto> {
  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    @Inject(HttpService) protected readonly httpService: HttpService,
    @Inject(ConfigService) protected readonly configService: ConfigService,
  )  {
    super(configService, httpService, cacheManager, 'test');
  }
}

describe('Clients Testings', () => {
  let service: BaseBearerTestingService;
  let httpService: HttpService;
  const CLIENTS_MOCK_DATA = [{ id: '1' }, { id: '2' }, { id: '3' }];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BaseCacheModule],
      providers: [
        BaseBearerTestingService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = await moduleRef.resolve(BaseBearerTestingService);
    httpService = moduleRef.get(HttpService);

    jest.spyOn(service, 'httpOptions').mockResolvedValue({} as any);
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
