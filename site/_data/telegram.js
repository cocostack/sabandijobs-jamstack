var axios  = require('axios');
var toJSON = require('xml2js').parseString;
const striptags = require("striptags");
var cheerio = require("cheerio");

var url = process.env.TELEGRAM_FEED || "https://tg.i-c-a.su/rss/sabandijobs?limit=100";

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        toJSON(response.data, function (err, result) {
          result.rss.channel[0].item.forEach(element => {
            var url = element.link[0].split('/');
            element.path = url[url.length-1].split('?')[0];
            let html = new String(element.description);
            const jq = cheerio.load('<p></p>');
            element.title = jq("p").html(html).find("strong").eq(1).text();
          });
          resolve({'url': url, 'posts': result.rss.channel[0].item});
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
