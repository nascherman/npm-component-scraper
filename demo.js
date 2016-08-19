var KEYWORDS = ['generator', 'ui'];
var KeywordScraper = require('./');

var opts = {
  keywords: KEYWORDS,
  level: 3
}

var keywordScraper = new KeywordScraper(opts);

keywordScraper.getFromKeywords(function(modules) {
  console.log(modules);
});