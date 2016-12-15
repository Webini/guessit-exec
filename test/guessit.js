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

  const expectedAdvancedData = { 
    title: { value: 'South Park', raw: 'South.Park', start: 0, end: 11 },
    season: { value: 1, raw: '01', start: 12, end: 14 },
    episode: { value: 1, raw: '01', start: 16, end: 18 },
    screen_size: { value: '720p', raw: '720', start: 19, end: 22 },
    container: { value: 'mkv', raw: 'mkv', start: 22, end: 26 },
    mimetype: { value: 'video/x-matroska', start: 26, end: 26 },
    type: { value: 'episode', start: 26, end: 26 }
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


  it('Should retreive advanced results', (done) => {
    guessit(serieName, { advanced: true })
      .then((data) => {
        assert.deepStrictEqual(data, expectedAdvancedData);
        done();
      })
      .catch((e) => { done(e); });
  });
});