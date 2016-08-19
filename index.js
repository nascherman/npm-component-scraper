'use strict';
var npmKeyword = require('npm-keyword');
var got = require('got');

var registryUrl = require('registry-url');
var xtend = require('xtend');

var DEFAULT_OPTS = {
  keywords: ['baboon'],
  level: 3
}

function KeywordScraper(opts) {
  this.opts = xtend(DEFAULT_OPTS, opts);
}

KeywordScraper.prototype.getFromKeywords = function(cb) {
  this.getModules(function(modules) {
    modules = parseModules(modules);
    cb(modules);
  });
}

KeywordScraper.prototype.getModules = function(cb) {
  var keywords = this.opts.keywords;
  var level = this.opts.level;
  var modules = [];
  if(!this.opts) {
    console.warn('no opts set');
    this.opts = DEFAULT_OPTS;
  }
  if(typeof cb !== 'function' || !cb) {
    throw new Error('callback must be defined');
  }

  recursiveGet(keywords, level, modules, function(modules) {
    cb(modules);
  });
}

// recursive 'synchronous' requests for tags
var recursiveIndex = 0;
function recursiveGet(keywords, level, modules, cb) {
  getKeyword(keywords[recursiveIndex], level, function(res) {
    recursiveIndex++;
    modules.push(res);
    if(recursiveIndex === keywords.length) {
      recursiveIndex = 0;
      cb(modules);
    }
    else {
      recursiveGet(keywords, level, modules, cb);
    }
  });
}

// parse modules to search for duplicates
function parseModules(modules) {
  var minLength = modules[0].length;
  var minIndex = 0;
  var moduleParse = [];
  var parsedModules = [];
  Object.keys(modules).forEach(function(module, i) {
    if(modules[module].length < minLength) {
      minLength = modules[module.length];
      minIndex = i;
    }
    moduleParse = moduleParse.concat(modules[module]);
  });

  modules[minIndex].forEach(function(mod) {
    var count = 0;
    moduleParse.forEach(function(m) {
      if(m.key[1] === mod.key[1]) count++;
    });
    if(count === modules.length) {
      parsedModules.push(mod);
    }
  });
  return parsedModules;
}

function getKeyword(keyword, level, cb) {
  if (typeof keyword !== 'string') {
    throw new Error('Keyword must be a string');
  }

  keyword = encodeURIComponent(keyword);

  var url = registryUrl() +
    '-/_view/byKeyword?' +
    'startkey=[%22' + keyword + '%22]' +
    '&endkey=[%22' + keyword + '%22,%7B%7D]' +
    '&group_level=' + level;

  got(url, {json: true}).then(function (res) {
    cb(res.body.rows);
  });

}

module.exports = KeywordScraper;