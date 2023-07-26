import { MovieDto } from 'src/app/omdb/dto/movie.dto';
import { MovieListDto } from 'src/app/omdb/dto/movieList.dto';
import { MovieInterface, MovieListInterface } from '../app/omdb/interface/omdb.interface';

export function movieListValidator(data: MovieListInterface, page?: string): MovieListDto {
  const totalPages = Math.ceil(parseInt(data.totalResults) / 10);

  return {
    list: data.Search,
    page: page ? page : '1',
    totalPages,
  };
}

export function movieValidator(data: MovieInterface): MovieDto {
  const index = data.Ratings.findIndex((e) => e.Source === 'Rotten Tomatoes');
  const tomatoes = index ? data.Ratings[index].Value : '';

  return {
    title: data.Title,
    released: data.Released,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    writer: data.Writer,
    actors: data.Actors,
    plot: data.Plot,
    awards: data.Awards,
    poster: data.Poster,
    tomatoes,
    imdbID: data.imdbID,
    type: data.Type,
  };
}
