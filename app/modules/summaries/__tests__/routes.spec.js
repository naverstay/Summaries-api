import supertest from 'supertest';
import server from '../../../server';
import {
  close,
  dropDb,
} from '../../../utils/mongo';

describe('Summaries routes', () => {
  describe('summaries search', () => {
    afterAll(async () => {
      await dropDb();
      await close();
      await server.close();
    });

    it('return empty array', async () => {
      const response = await supertest(server).get('/api/summaries');

      expect(response.body).toEqual({
        data: [],
        filter: {
          title: '',
          tags: [],
          size: 20,
          page: 1,
        },
        count: 0,
        pages: 0,
      });
    });
  });
});
