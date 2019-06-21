const request = require('request');
const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;

export function SendRequest(url) {
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
            reject(`Request failed: ${res.statusCode}: ${res.statusMessage}`);
         }

         resolve(JSON.parse(body));
      });
   });
}