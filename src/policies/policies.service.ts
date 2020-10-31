import { Injectable } from '@nestjs/common';
import { BaseBearerService } from 'src/utils/base-bearer.service';

@Injectable()
export class PoliciesService extends BaseBearerService {
  protected baseUrl = 'policies';
}