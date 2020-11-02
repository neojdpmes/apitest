import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoliciesService } from '../policies/policies.service';
import { PoliciesModule } from '../policies/policies.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ baseURL: configService.get('application.apiUrl') }),
    }),
    PoliciesModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService, PoliciesService],
})
export class ClientsModule {}
