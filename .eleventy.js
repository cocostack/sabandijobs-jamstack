const CleanCSS = require("clean-css");
const postcss = require('postcss')
const precss = require('precss')
const striptags = require("striptags");
const util = require("util");

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("dump", (obj) => {
    return util.inspect(obj);
  });

  eleventyConfig.addFilter("date", require("./filters/dates.js") );

  eleventyConfig.addFilter("striptag", (html) => {
    let text = new String(html)
    return striptags(text,["strong", "em", "b", "i", "blockquote", "p", "cite", "img", "ul", "li", "ol"]);
  });

  return {
    dir: {
      input: "site",
      output: "dist",
      data: "_data"
    },
    feed: process.env.TELEGRAM_FEED ||'https://tg.i-c-a.su/rss/sabandijobs?limit=5'
  };

};
