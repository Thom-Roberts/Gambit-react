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
				console.error(res.body);
            reject(`Request failed: ${res.statusCode}: ${JSON.parse(body).Message}`);
         }

         resolve(JSON.parse(body));
      });
   });
}