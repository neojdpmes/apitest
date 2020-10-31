import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoliciesModule } from 'src/policies/policies.module';
import { PoliciesService } from 'src/policies/policies.service';
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
