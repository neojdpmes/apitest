import { CacheModule, Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    CacheModule.register({ ttl: 3600 }),
  ],
  exports: [CacheModule]
})
export class BaseCacheModule {}
