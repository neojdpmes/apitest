import { Inject, Injectable } from '@nestjs/common';
import { PoliciesService } from 'src/policies/policies.service';
import { BaseBearerService } from 'src/utils/base-bearer.service';

@Injectable()
export class ClientsService extends BaseBearerService {
  @Inject(PoliciesService) protected readonly policiesService: PoliciesService;
  protected baseUrl = 'clients';

  async getPolicies(id: string) {
    const policies = await this.policiesService.getData();
    return policies.filter((policy) => policy.clientId === id );
  }
}
