import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OmdbModule } from './app/omdb/omdb.module';

@Module({
  imports: [ConfigModule.forRoot(), OmdbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
