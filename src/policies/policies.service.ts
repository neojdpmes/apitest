import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { BaseBearerService } from '../utils';

@Injectable()
export class PoliciesService extends BaseBearerService {
  protected baseUrl = 'policies';
  
  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    @Inject(REQUEST) protected request: Request,
    @Inject(HttpService) protected readonly httpService: HttpService,
  ) {
    super(httpService, cacheManager, request);
  }
}