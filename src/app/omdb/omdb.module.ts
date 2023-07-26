import { Module } from '@nestjs/common';
import { OmdbService } from './service/omdb.service';
import { HttpModule } from '@nestjs/axios';
import { OmdbController } from './omdb.controller';

@Module({
  imports: [HttpModule],
  controllers: [OmdbController],
  providers: [OmdbService],
})
export class OmdbModule {}
