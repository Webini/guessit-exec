Guessit-exec
============
## Description

Guessit exec is a simple method that allow you to call the python binary of guessit v2 in nodeJS

## Requirements
You must install [guessit v2](https://github.com/guessit-io/guessit) before using this script

## Usage

```js
  const guessit = require('guessit-exec');
  
  guessit('South.Park.s01.e01.720.mkv')
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
```

## Prototype

```c
Promise guessit(String filename, Object options)
```

Guessit method return an es6 promise.

### Options Object
Field name | Value allowed | Guessit Parameter
---------- | ------------- | -----------------
type | string | --type | 
config | string | --config | 
nameOnly | boolean | --name-only | 
dateYearFirst | boolean | --date-year-first | 
dateDayFirst | boolean | --date-day-first | 
allowedLanguages | array | -L | 
allowedCountries | array | -C | 
episodePreferNumber | boolean | -E | 
expectedTitle | string | -T | 
expectedGroup | string | -G | 
advanced | boolean | -a

For more information about guessit parameter, go to [Guessit Documentation](http://guessit.readthedocs.io/en/latest/)