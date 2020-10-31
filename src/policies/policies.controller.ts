import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PolicyDataDto, PolicyQuery } from './dto/policies.dto';
import { PoliciesService } from './policies.service';

@ApiTags('policies')
@Controller('policies')
@ApiUnauthorizedResponse()
export class PoliciesController {
  constructor(private readonly service: PoliciesService) {}

  @Get()
  @ApiOkResponse({ type: [PolicyDataDto] })
  @ApiUnauthorizedResponse()
  policies(@Query() query: PolicyQuery) {
    return this.service.getAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: PolicyDataDto })
  @ApiUnauthorizedResponse()
  getPolicy(@Param('id') id: number) {
    return this.service.get(id);
  }

}
