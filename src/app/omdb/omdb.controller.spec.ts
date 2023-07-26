import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { OmdbController } from './omdb.controller';
import { OmdbService } from './service/omdb.service';

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
        list: [
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
        page: '1',
        totalPages: 5,
      };

      jest.spyOn(omdbService, 'search').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await omdbController.search({ s: 'Toy Story' })).toBe(result);
      expect(await omdbController.search({ s: 'Toy Story' })).not.toBe('teste');
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const result = {
        title: null,
        released: '25 Nov 1995',
        runtime: '81 min',
        genre: 'Animation, Adventure, Comedy',
        director: 'John Lasseter',
        writer: 'John Lasseter, Pete Docter, Andrew Stanton',
        actors: 'Tom Hanks, Tim Allen, Don Rickles',
        plot: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
        awards: 'Nominated for 3 Oscars. 29 wins & 23 nominations total',
        poster:
          'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg',
        tomatoes: '100%',
        imdbID: 'tt0114709',
        type: 'movie',
      };

      jest.spyOn(omdbService, 'findByID').mockImplementation(() => new Promise((resolve) => resolve(result)));

      expect(await omdbController.findOne({ id: 'tt0114709' })).toBe(result);
      expect(await omdbController.findOne({ id: 'tt0114709' })).not.toBe('teste');
    });
  });
});
