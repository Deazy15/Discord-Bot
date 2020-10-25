const cheerio = require('cheerio');
const request = require('request');

// eslint-disable-next-line no-unused-vars
function image5(message){
 
    const options = {
        url: "http://results.dogpile.com/serp?qc=images&q=%20my%20dick%20hurts",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        const $ = cheerio.load(responseBody);
 
 
        const links = $(".image a.link");
 
        const urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[3]);
    });
};




module.exports = {   
    name: 'schwanzweh',
    description: "mein schwanz tut weh",
    // eslint-disable-next-line no-unused-vars
    execute(message, args){
        message.channel.send('Da tut mir ziemlich der Schwanz weh. https://www.youtube.com/watch?v=PDeTO26fRVQ');
    }
}