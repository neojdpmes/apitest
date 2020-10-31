import { HttpService, Injectable } from '@nestjs/common';
import { ClientQuery } from './dto/clients.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly httpService: HttpService) {}

  async getAll(query: ClientQuery) {
    return 'Hi';
  }
  async get(id: number) {
    return 'Hi';
  }
}
