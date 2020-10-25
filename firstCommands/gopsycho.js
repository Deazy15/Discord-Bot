const cheerio = require('cheerio');
const request = require('request');

// eslint-disable-next-line no-unused-vars
function image4(message){
 
    const options = {
        url: "https://results.dogpile.com/serp?qc=images&q=Hip%20to%20be%20square%20roger%20american%20dad",
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
 
 
        // eslint-disable-next-line no-var
        // eslint-disable-next-line vars-on-top
        const links = $(".image a.link");
 
        // eslint-disable-next-line no-var
        // eslint-disable-next-line vars-on-top
        const urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls [4]);
    });
};


module.exports = {   
    name: 'gopsycho',
    description: "Plays hip to be square",
    // eslint-disable-next-line no-unused-vars
    execute(message, args){
        message.channel.send(`It's hip to be square! https://www.youtube.com/watch?v=LB5YkmjalDg`);
    },
};

