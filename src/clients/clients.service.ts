import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { PoliciesService } from '../policies/policies.service';
import { BaseBearerService } from '../utils';

@Injectable()
export class ClientsService extends BaseBearerService {
  protected baseUrl = 'clients';

  constructor(
    @Inject(PoliciesService) protected readonly policiesService: PoliciesService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    @Inject(REQUEST) protected request: Request,
    @Inject(HttpService) protected readonly httpService: HttpService,
  ) {
    super(httpService, cacheManager, request);
  }

  public async getPolicies(id: string) {
    const policies = await this.policiesService.getData();
    return policies.filter(policy => policy.clientId === id);
  }
}
