/*global describe,it*/

const guessit = require('../guessit.js');
const assert  = require('assert');

describe('Guessit', () => {
  const valideOptions = {
    type: 'movie',
    config: null,
    nameOnly: true,
    dateYearFirst: false,
    dateDayFirst: true,
    allowedLanguages: [ 'fr', 'cz' ],
    allowedCountries: [ 'fr', 'en' ],
    episodePreferNumber: false,
    expectedTitle: 'title',
    expectedGroup: 'group',
  };

  const expectedValidOptions = [ 
    '--type', 'movie', '--name-only', '--date-day-first',
    '-L', 'fr', '-L', 'cz', '-C', 'fr', '-C', 'en', '-T', 'title',
    '-G', 'group' 
  ];

  const serieName = 'South.Park.s01.e01.720.mkv';
  const expectedSerieData = { 
    title: 'South Park',
    season: 1,
    episode: 1,
    screen_size: '720p',
    container: 'mkv',
    mimetype: 'video/x-matroska',
    type: 'episode' 
  };

  it('Should convert options to guessit parameters', () => {
    assert.deepStrictEqual(guessit._convertOptions(valideOptions), expectedValidOptions);
  });

  it('Should retreive result', (done) => {
    guessit(serieName)
      .then((data) => {
        assert.deepStrictEqual(data, expectedSerieData);
        done();
      })
      .catch((e) => { done(e); });
  });
});