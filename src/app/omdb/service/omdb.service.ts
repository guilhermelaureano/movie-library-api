import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { MovieInterface, MovieListInterface } from '../interface/omdb.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OmdbService {
  constructor(private readonly httpService: HttpService) {}
  private readonly apiKey = process.env.APIKEY_OMDB;
  private readonly logger = new Logger(OmdbService.name);
  private readonly url = 'https://www.omdbapi.com';

  async search(title: string): Promise<MovieListInterface> {
    const config = {
      params: {
        apikey: this.apiKey,
        s: title,
      },
    };
    this.logger.log(`GET search ${title}`);

    const response = await lastValueFrom(this.httpService.get(this.url, config));
    this.logger.log(`GET search ${response.status} ${response.statusText}`);

    const result = {
      ...response.data,
    };
    return result;
  }

  async findByID(id: string): Promise<MovieInterface> {
    const config = {
      params: {
        apikey: '1313cf1b',
        i: id,
      },
    };
    this.logger.log(`GET findOne ${id}`);

    const response = await lastValueFrom(this.httpService.get(this.url, config));
    this.logger.log(`GET findOne ${response.status} ${response.statusText}`);

    const result = {
      ...response.data,
    };
    return result;
  }
}
