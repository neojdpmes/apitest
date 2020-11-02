import { CacheModule, Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    CacheModule.register(),
  ],
  exports: [CacheModule]
})
export class BaseCacheModule {}
