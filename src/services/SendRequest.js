const request = require('request');
const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;

function SendRequest(url) {
   return new Promise((resolve, reject) => {
      const options = {
         'url': url,
         'headers': {
            'X-Api-Key': BUNGIEAPIKEY,
         },
      };

      request.get(options, (err, res, body) => {
         if(err) {
            reject(err);
         }
			if(res.statusCode !== 200) {
            reject(`Could not resolve connection in time`);
         }

         resolve(JSON.parse(body));
      });
   });
}

module.exports = {
   SendRequest
};