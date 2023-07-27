import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { movieListValidator, movieValidator } from '../../../utils';
import { SearchDto } from '../dto/search.dto';
import { FindOneDto } from '../dto/findOne.dto';
import { MovieDto } from '../dto/movie.dto';
import { MovieListDto } from '../dto/movieList.dto';

@Injectable()
export class OmdbService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(OmdbService.name);
  private readonly apiKey = process.env.APIKEY_OMDB;
  private readonly url = 'https://www.omdbapi.com';

  async search({ s, page }: SearchDto): Promise<MovieListDto> {
    const config = {
      params: {
        apikey: this.apiKey,
        s,
        page: page,
      },
    };
    this.logger.log(`GET search ${s}, page ${page}`);

    const response = await lastValueFrom(this.httpService.get(this.url, config));
    this.logger.log(`GET search ${response.status} ${response.statusText} ${response.data.Error}`);

    const result = movieListValidator(response.data, page);
    return result;
  }

  async findByID(id: FindOneDto): Promise<MovieDto> {
    const config = {
      params: {
        apikey: '1313cf1b',
        i: id,
      },
    };
    this.logger.log(`GET findOne ${id}`);

    const response = await lastValueFrom(this.httpService.get(this.url, config));
    this.logger.log(`GET findOne ${response.status} ${response.statusText}`);

    const result = movieValidator(response.data);
    return result;
  }
}
