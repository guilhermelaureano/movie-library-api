import { Controller, Get, Param } from '@nestjs/common';
import { OmdbService } from './service/omdb.service';
import { MovieInterface, MovieListInterface } from './interface/omdb.interface';

@Controller('/')
export class OmdbController {
  constructor(private readonly omdbService: OmdbService) {}

  @Get('/:title')
  async search(@Param('title') title: string): Promise<MovieListInterface> {
    return this.omdbService.search(title);
  }

  @Get('/movie/:id')
  async findOne(@Param('id') id: string): Promise<MovieInterface> {
    return this.omdbService.findByID(id);
  }
}
