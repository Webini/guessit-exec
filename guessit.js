module.exports = (function() {
  const spawn    = require('child_process').spawn;

  const optionsType = {
    type: 'string',
    config: 'string',
    nameOnly: 'boolean',
    dateYearFirst: 'boolean',
    dateDayFirst: 'boolean',
    allowedLanguages: 'array',
    allowedCountries: 'array',
    episodePreferNumber: 'boolean',
    expectedTitle: 'string',
    expectedGroup: 'string',
  };

  const optionsMap  = {
    type: '--type',
    config: '--config',
    nameOnly: '--name-only',
    dateYearFirst: '--date-year-first',
    dateDayFirst: '--date-day-first',
    allowedLanguages: '-L',
    allowedCountries: '-C',
    episodePreferNumber: '-E',
    expectedTitle: '-T',
    expectedGroup: '-G',
  };

  /**
   * @param string filename Filename
   * @param object options Options
   */
  function guess(filename, options) {
    return new Promise((resolve, reject) => {
      let parameters = [];
      const advanced = (options && options.advanced);
      
      if (advanced) {
        delete options.advanced;
      }
      
      try {
        if (options) {
          parameters = guess._convertOptions(options);
        }
      } catch(e) {
        return reject(e);
      }

      if (advanced) {
        parameters.push('-a');
      } else {
        parameters.push('-j');
      }

      parameters.push(filename);
      
      const child = spawn(
          'guessit', 
          parameters
      );
      
      child.stdout.on('data', (response) => {
        let data = response.toString();

        if (advanced) {
          data = response.toString()
                         .replace(/(\r\n|\n|\r)/gm, '')
                         .match(/found: (\{.*\})/i);
          
          if(data == null || data.length <= 1){
            return reject(new Error('No result returned'));
          }

          data = data[1];
        }
        
        if (data === null || data.length <= 0) {
          return reject(new Error('No result returned'));
        }

        try{
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);   
        }
      });
      
      child.stderr.on('data', (err) => {
        reject(new Error(err.toString()));    
      });
    });
  }

  guess._convertOptions = function(options) {
    const parameters = [];

    for (const name in options) {
      const value = options[name];
      
      if (value === null || value === false) {
        continue;
      }

      if (!optionsType[name]) {
        throw new Error(`Option named ${name} doesn't exist`);
      }
      
      const type = optionsType[name];
      if ((type === 'array' && !(value instanceof Array)) ||
          (type !== 'array' && typeof value !== type)) {
        throw new Error(`Option named ${name} must be of type ${type}`);
      }

      const parameterName = optionsMap[name];

      if (type === 'array') {
        value.forEach((element) => {
          parameters.push(parameterName);
          if (type !== 'boolean') {
            parameters.push(element);
          }
        });
      } else {
        parameters.push(parameterName);
        if (type !== 'boolean') {
          parameters.push(value);
        }
      }
    }

    return parameters;
  };

  return guess;
})();
