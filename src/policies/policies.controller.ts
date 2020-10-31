import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PoliciesService } from './policies.service';

@ApiTags('policies')
@Controller('policies')
export class PoliciesController {
  constructor(private readonly service: PoliciesService) {}

}
