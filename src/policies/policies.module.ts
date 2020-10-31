import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ baseURL: configService.get('application.apiUrl') }),
    }),
  ],
  controllers: [PoliciesController],
  providers: [PoliciesService],
})
export class PoliciesModule {}
