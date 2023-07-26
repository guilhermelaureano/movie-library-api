import { IsNotEmpty } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  s: string;

  page?: string;
}
