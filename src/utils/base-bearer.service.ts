import { HttpService, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

const CACHE_OPTIONS = {
  ttl: 3600,
};

export class BaseBearerService<T extends { id: string }> {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
    protected readonly cacheManager: Cache,
    protected baseUrl,
  ) {}

  public async get(id: string) {
    const data = await this.getData();
    return data.find(x => x.id === id);
  }

  public async getData(): Promise<T[]> {
    try {
      const etag = await this.cacheManager.get(`${this.baseUrl}-etag`);
      // Axios al recibir el status 304 dispara un error.
      const response = await this.httpService.get(this.baseUrl, await this.httpOptions(etag)).toPromise();
      // Gets TTL from response
      const cacheOptions = this.getExpiration(response.headers.expires);
      this.cacheManager.set(`${this.baseUrl}-etag`, response.headers.etag, cacheOptions);
      this.cacheManager.set(`${this.baseUrl}-data`, response.data, cacheOptions);
      return response.data;
    } catch (err) {
      if (err.response.status !== 304) throw new InternalServerErrorException();
      else {
        Logger.log('Not modified.');
        return this.cacheManager.get(`${this.baseUrl}-data`);
      }
    }
  }

  async getApiToken() {
    const response = await this.httpService
      .post('login', {
        "client_id": this.configService.get('application.clientId'),
        "client_secret": this.configService.get('application.clientSecret'),
      })
      .toPromise();
    return response.data.token;
  }

  async httpOptions(etag = '') {
    let cachedToken = await this.cacheManager.get(`dareToken`);
    if (!cachedToken) {
      cachedToken = await this.getApiToken();
      this.cacheManager.set('dareToken', cachedToken, CACHE_OPTIONS);
    }

    return {
      headers: {
        authorization: 'Bearer ' + cachedToken,
        'If-None-Match': etag,
      },
    };
  }

  private getExpiration(expDate: string) {
    const ttl = (new Date(expDate).getTime() - new Date().getTime()) / 1000;
    return { ttl };
  }
}
