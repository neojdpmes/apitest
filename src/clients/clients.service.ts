import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { PoliciesService } from '../policies/policies.service';
import { BaseBearerService } from '../utils';
import { ClientDataDto } from './dto/clients.dto';

@Injectable()
export class ClientsService extends BaseBearerService<ClientDataDto> {

  constructor(
    @Inject(PoliciesService) protected readonly policiesService: PoliciesService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    @Inject(HttpService) protected readonly httpService: HttpService,
    @Inject(ConfigService) protected readonly configService: ConfigService,
  ) {
    super(configService, httpService, cacheManager, 'clients');
  }

  public async getPolicies(id: string) {
    const policies = await this.policiesService.getData();
    return policies.filter(policy => policy.clientId === id);
  }
}
