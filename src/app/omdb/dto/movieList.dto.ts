import { MovieInterface } from '../interface/omdb.interface';

export class MovieListDto {
  list: Array<MovieInterface>;
  page: string;
  totalPages: number;
}
