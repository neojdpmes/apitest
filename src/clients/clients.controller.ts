import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PolicyDataDto } from 'src/policies/dto/policies.dto';
import { ClientsService } from './clients.service';
import { ClientDataDto, ClientQuery } from './dto/clients.dto';

@ApiTags('clients')
@Controller('clients')
@ApiUnauthorizedResponse()
export class ClientsController {
  constructor(private readonly service: ClientsService) {}
  
  @Get()
  @ApiOkResponse({ type: [ClientDataDto] })
  @ApiUnauthorizedResponse()
  clients(@Query() query: ClientQuery) {
    return this.service.getAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: ClientDataDto })
  @ApiUnauthorizedResponse()
  getClient(@Param('id') id: number) {
    return this.service.get(id);
  }

  @Get(':id/policies')
  @ApiOkResponse({ type: [PolicyDataDto] })
  @ApiUnauthorizedResponse()
  getClientPolicies(@Param('id') id: number) {
    return this.service.get(id);
  }

}
