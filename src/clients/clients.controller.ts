import { Controller } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller()
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

}
