import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/client.module';
import { CONFIGS } from './config';
import { PoliciesModule } from './policies/policies.module';
import { BaseCacheModule } from './utils/cache.module';

@Module({
  imports: [
    BaseCacheModule,
    ConfigModule.forRoot({ isGlobal: true, load: CONFIGS }),
    AuthModule,
    ClientsModule,
    PoliciesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
