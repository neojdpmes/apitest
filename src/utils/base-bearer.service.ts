import { CACHE_MANAGER, HttpService, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export class BaseBearerService {
  protected baseUrl;

  constructor(
    protected readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager,
    @Inject(REQUEST) protected request,
  ) {}

  async get(id: string) {
    const data = await this.getData();
    return data.find((x) => x.id === id);
  }

  async getData(): Promise<any[]> {
    const etag = await this.cacheManager.get(`${this.baseUrl}-etag`);
    try {
      const response = await this.httpService.get(this.baseUrl, this.httpOptions(etag)).toPromise();
      this.cacheManager.set(`${this.baseUrl}-etag`, response.headers.etag);
      this.cacheManager.set(`${this.baseUrl}-data`, response.data);
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
