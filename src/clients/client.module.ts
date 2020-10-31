import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ baseURL: configService.get('application.apiUrl') }),
    }),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
