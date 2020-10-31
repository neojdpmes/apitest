import { HttpService, Injectable } from '@nestjs/common';
import { PolicyQuery } from './dto/policies.dto';

@Injectable()
export class PoliciesService {
  constructor(private readonly httpService: HttpService) {}

  async getAll(query: PolicyQuery) {
    return 'Hi';
  }
  async get(id: number) {
    return 'Hi';
  }
}
