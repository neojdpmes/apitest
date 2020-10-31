import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PolicyDataDto } from 'src/policies/dto/policies.dto';
import { ClientsService } from './clients.service';
import { ClientDataDto, ClientQuery } from './dto/clients.dto';

@ApiTags('clients')
@Controller('clients')
@ApiUnauthorizedResponse()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly service: ClientsService) {}
  
  @Get()
  @ApiOkResponse({ type: [ClientDataDto] })
  @ApiUnauthorizedResponse()
  async getClients(@Query() query: ClientQuery) {
    const clients = await this.service.getData();
    return clients.filter((client: ClientDataDto) => client.name.includes(query.name)).slice(0, query.limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: ClientDataDto })
  @ApiUnauthorizedResponse()
  getClient(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Get(':id/policies')
  @ApiOkResponse({ type: [PolicyDataDto] })
  @ApiUnauthorizedResponse()
  getClientPolicies(@Param('id') id: string) {
    return this.service.getPolicies(id);
  }

}
