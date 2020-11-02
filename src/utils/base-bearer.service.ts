import { CACHE_MANAGER, HttpService, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';

const CACHE_OPTIONS = {
  ttl: 3600,
};

export class BaseBearerService {
  protected baseUrl;

  constructor(
    @Inject(HttpService) protected readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    @Inject(REQUEST) protected request: Request,
  ) {}

  public async get(id: string) {
    const data = await this.getData();
    return data.find(x => x.id === id);
  }

  public async getData(): Promise<any[]> {
    try {
      const etag = await this.cacheManager.get(`${this.baseUrl}-etag`);
      const response = await this.httpService.get(this.baseUrl, this.httpOptions(etag)).toPromise();
      this.cacheManager.set(`${this.baseUrl}-etag`, response.headers.etag, CACHE_OPTIONS);
      this.cacheManager.set(`${this.baseUrl}-data`, response.data, CACHE_OPTIONS);
      return response.data;
    } catch (err) {
      if (err.response.status !== 304) throw new InternalServerErrorException();
      else {
        Logger.log('Not modified.');
        return this.cacheManager.get(`${this.baseUrl}-data`);
      }
    }
  }

  private httpOptions(etag = '') {
    return {
      headers: {
        authorization: 'Bearer ' + this.request.user.token,
        'If-None-Match': etag,
      },
    };
  }
}
