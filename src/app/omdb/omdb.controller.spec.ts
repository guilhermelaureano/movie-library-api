import { HttpModule } from '@nestjs/axios';
import { OmdbController } from './omdb.controller';
import { OmdbService } from './service/omdb.service';
import { Test } from '@nestjs/testing';

describe('OmdbController', () => {
  let omdbController: OmdbController;
  let omdbService: OmdbService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [OmdbController],
      providers: [OmdbService],
    }).compile();

    omdbService = module.get<OmdbService>(OmdbService);
    omdbController = module.get<OmdbController>(OmdbController);
  });

  describe('search', () => {
    it('should return an array with the movies', async () => {
      const result = {
        Search: [
          {
            Title: 'Toy Story',
            Year: '1995',
            imdbID: 'tt0114709',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg',
          },
          {
            Title: 'Toy Story 3',
            Year: '2010',
            imdbID: 'tt0435761',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_SX300.jpg',
          },
        ],
        totalResults: '49',
        Response: 'True',
      };

      jest.spyOn(omdbService, 'search').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await omdbController.search('Toy Story')).toBe(result);
      expect(await omdbController.search('Toy Story')).not.toBe('teste');
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const result = {
        Title: 'Toy Story',
        Year: '1995',
        Rated: 'G',
        Released: '25 Nov 1995',
        Runtime: '81 min',
        Genre: 'Animation, Adventure, Comedy',
        Director: 'John Lasseter',
        Writer: 'John Lasseter, Pete Docter, Andrew Stanton',
        Actors: 'Tom Hanks, Tim Allen, Don Rickles',
        Plot: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
        Language: 'English',
        Country: 'United States, Japan',
        Awards: 'Nominated for 3 Oscars. 29 wins & 23 nominations total',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg',
        Ratings: [
          {
            Source: 'Internet Movie Database',
            Value: '8.3/10',
          },
          {
            Source: 'Rotten Tomatoes',
            Value: '100%',
          },
          {
            Source: 'Metacritic',
            Value: '96/100',
          },
        ],
        Metascore: '96',
        imdbRating: '8.3',
        imdbVotes: '1,023,762',
        imdbID: 'tt0114709',
        Type: 'movie',
        DVD: '23 Mar 2010',
        BoxOffice: '$223,225,679',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
      };

      jest.spyOn(omdbService, 'findByID').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await omdbController.findOne('tt0114709')).toBe(result);
      expect(await omdbController.findOne('tt0114709')).not.toBe('teste');
    });
  });
});
