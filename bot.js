// Twit npm module
var twit = require('twit'), config = require('./config');

//Request and Cheerio module
var request = require('request'), cheerio = require('cheerio');

var Twitter = new twit(config);
var tweet = function()
{
  
  //Using Pak's Quote API
  request('http://quote.machinu.net/api/', function(err, resp, html)
  {
    // Scraping the quote from the page
    var text, quote;
    var $page = cheerio.load(html),
    text = $page("html").text();
    var obj = JSON.parse(text);
    quote=obj.text;
    
    var qlen = quote.length;
    // Tweet the quote only if number of characters > 42
    if(qlen>42)
    {
      Twitter.post('statuses/update', { status: 'Tua, ' + quote }, function(err, response)
      {
        if (response)
        {
          console.log('Tweeted! Yaay!');
        }
        // If there was an error while tweeting
        if (err)
        {
          console.log('Oops!');
        }
       });
    }
    // Go for another quote with more than 42 characters
    else
    {
      tweet();
    }
  });
}

// Tweet as soon as program is running...
tweet();
// Tweet in every 30 minutes
setInterval(tweet, 1800000);
