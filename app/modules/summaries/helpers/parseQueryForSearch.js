import {
  MAX_SIZE,
  PAGE,
} from '../constants/pagination';

export default (queryParams) => {
  const search = {
    title: queryParams.title ? queryParams.title : '',
    tags: queryParams.tags ? queryParams.tags.split(',') : [],
    size: parseInt(queryParams.size),
    page: parseInt(queryParams.page),
  };

  if (!search.size || search.size > MAX_SIZE) {
    search.size = MAX_SIZE;
  }

  if (!search.page) {
    search.page = PAGE;
  }

  return search;
};
