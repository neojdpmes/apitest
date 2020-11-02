import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PoliciesService } from '../policies/policies.service';
import { BaseCacheModule } from '../utils';

describe('Clients Testings', () => {
  let service: ClientsService;
  const POLICIES_MOCK_DATA = [{ clientId: "1" }, { clientId: "2" }, { clientId: "3" }];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BaseCacheModule],
      providers: [
        ClientsService,
        {
          provide: PoliciesService,
          useValue: {
            getData: jest.fn().mockResolvedValue(POLICIES_MOCK_DATA),
          },
        },
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
          },
        },
      ],
    }).compile();

    service = await moduleRef.resolve(ClientsService);
  });

  it('Get client policies data', async () => {
    expect(await service.getPolicies('1')).toStrictEqual([POLICIES_MOCK_DATA[0]]);
  });

  it('Get non existant client policies data', async () => {
    expect(await service.getPolicies('10')).toEqual([]);
  });
});
