# npm-keyword-scraper
A scraper to get npm modules from the registry that match all 
of a series of keywords.

## Usage 

```javascript
var KEYWORDS = ['generator', 'ui'];
var KeywordScraper = require('./');

var opts = {
  keywords: KEYWORDS,
  level: 3
}

var keywordScraper = new KeywordScraper(opts);

keywordScraper.getFromKeywords(function(modules) {
  JSON.stringify(modules);
});
```

result 

```JSON
[
  {
    "key": [
      "ui",
      "apui",
      "A documentation UI generator for API's"
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "generator-appverse-html5",
      "Appverse HTML 5 generator"
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "html-maker",
      "Yet another HTML builder"
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "htmlgen",
      "Simple canonical HTML generator."
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "nyg-ui-generator",
      "UI scaffold generator and module publisher"
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "react-native-ksi-barcode",
      "barcode code128 generator"
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "reactive-builder",
      "Reactive DOM elements created with CoffeeScript"
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "slush-helpful-ui",
      "Opinionated front-end structure with some pre-built Stylus components."
    ],
    "value": 1
  },
  {
    "key": [
      "ui",
      "zeus-html",
      "Simple HTML generator written on coffee-script"
    ],
    "value": 1
  }
]```