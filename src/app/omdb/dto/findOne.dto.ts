import { IsNotEmpty } from 'class-validator';

export class FindOneDto {
  @IsNotEmpty()
  id: string;
}
