import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PolicyDataDto, PolicyQuery } from './dto/policies.dto';
import { PoliciesService } from './policies.service';

@ApiTags('policies')
@Controller('policies')
@ApiUnauthorizedResponse()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PoliciesController {
  constructor(private readonly service: PoliciesService) {}

  @Get()
  @ApiOkResponse({ type: [PolicyDataDto] })
  @ApiUnauthorizedResponse()
  async getPolicies(@Query() query: PolicyQuery) {
    const policies = await this.service.getData();
    return policies.slice(0, query.limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: PolicyDataDto })
  @ApiUnauthorizedResponse()
  getPolicy(@Param('id') id: string) {
    return this.service.get(id);
  }

}
