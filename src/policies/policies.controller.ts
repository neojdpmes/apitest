import { Controller } from '@nestjs/common';
import { PoliciesService } from './policies.service';

@Controller()
export class PoliciesController {
  constructor(private readonly service: PoliciesService) {}

}
