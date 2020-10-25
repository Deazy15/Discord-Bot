const cheerio = require('cheerio');
const request = require('request');

// eslint-disable-next-line no-unused-vars
function image2(message){
 
    const options = {
        url: "http://results.dogpile.com/serp?qc=images&q=%20Hitler%20Nazi",
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
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
};


module.exports = {   
    name: 'showhitler',
    description: "Bilder von dem Führer",
    // eslint-disable-next-line no-unused-vars
    execute(message, args){
        message.channel.send('Heil dem Führer!');
    }
}
