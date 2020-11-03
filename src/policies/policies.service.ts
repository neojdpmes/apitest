import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { BaseBearerService } from '../utils';
import { PolicyDataDto } from './dto/policies.dto';

@Injectable()
export class PoliciesService extends BaseBearerService<PolicyDataDto> {
  
  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    @Inject(HttpService) protected readonly httpService: HttpService,
    @Inject(ConfigService) protected readonly configService: ConfigService,
  ) {
    super(configService, httpService, cacheManager, 'policies');
  }
}