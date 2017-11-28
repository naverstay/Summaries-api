import parseQueryForSearch from '../../helpers/parseQueryForSearch';

describe('parseQueryForSearch', () => {
  it('success parse empty query', () => {
    const res = parseQueryForSearch({ fakeParam: 'ksdlfjklsdf' });

    expect(res).toEqual({
      title: '',
      tags: [],
      size: 20,
      page: 1,
    });
  });

  it('success parse query', () => {
    const data = {
      title: 'Senior js',
      tags: 'js,node',
      size: 13,
      page: 2,
    };
    const res = parseQueryForSearch(data);

    expect(res).toEqual({
      ...data,
      tags: data.tags.split(','),
    });
  });

  it('parse query with tags', () => {
    const res = parseQueryForSearch({ tags: 'first,second' });

    expect(res).toEqual({
      title: '',
      tags: ['first', 'second'],
      size: 20,
      page: 1,
    });
  });

  it('restore size > 20', () => {
    const res = parseQueryForSearch({ size: 40 });

    expect(res).toEqual({
      title: '',
      tags: [],
      size: 20,
      page: 1,
    });
  });
});
