const request = require('request');
const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');


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

function GetManifest(url) {
   return new Promise(async (resolve, reject) => {
      
      await request(url).pipe(unzipper.Extract({path: __dirname})).promise();

      const files = fs.readdirSync(__dirname);

      for (let i in files) {
         if (path.extname(files[i]) === ".content") {
         fs.rename(files[i], "db.sqlite3", function(err) {
            if (err) console.log("ERROR: " + err);
         });
         }
      }

      resolve();
   });
}

module.exports = {
   SendRequest,
   GetManifest,
};