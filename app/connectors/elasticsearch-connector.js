import elasticsearch from 'elasticsearch';
import { ELASTIC_SEARCH_URL } from '../config';

const client = new elasticsearch.Client({
  host: ELASTIC_SEARCH_URL,
});

export default client;
