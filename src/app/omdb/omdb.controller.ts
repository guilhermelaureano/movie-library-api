import { Controller, Get, Query } from '@nestjs/common';
import { FindOneDto } from './dto/findOne.dto';
import { MovieDto } from './dto/movie.dto';
import { MovieListDto } from './dto/movieList.dto';
import { SearchDto } from './dto/search.dto';
import { OmdbService } from './service/omdb.service';

@Controller('/')
export class OmdbController {
  constructor(private readonly omdbService: OmdbService) {}

  @Get()
  async search(@Query() params: SearchDto): Promise<MovieListDto> {
    return this.omdbService.search(params);
  }

  @Get('/movie')
  async findOne(@Query('id') id: FindOneDto): Promise<MovieDto> {
    return this.omdbService.findByID(id);
  }
}
