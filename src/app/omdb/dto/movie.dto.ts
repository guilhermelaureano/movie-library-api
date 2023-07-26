import { IsNotEmpty, IsUrl } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  released: string;

  @IsNotEmpty()
  runtime: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  director: string;

  @IsNotEmpty()
  writer: string;

  actors: string;

  @IsNotEmpty()
  plot: string;

  awards: string;

  @IsNotEmpty()
  @IsUrl()
  poster: string;
  tomatoes: string;

  @IsNotEmpty()
  imdbID: string;
  type: string;
}
