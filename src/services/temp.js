let request = require('request');
const http = require('http');
const cred = require('./BUNGIECRED').BUNGIEAPIKEY;
const base = 'http://www.bungie.net';
const fs = require('fs');

async function main() {
   let temp = await sendManifestRequest();

   let manifest = await sendOtherRequest(temp.Response.jsonWorldContentPaths.en);

   //console.log(manifest.DestinyAchievementDefinition);
}

function sendOtherRequest(extension) {
   return new Promise((resolve, reject) => {
      const options = {
         'url': base + extension,
         'headers': {
            'X-Api-Key': cred,
         },
      };

      request.get(options, (err, res, body) => {
         resolve(JSON.parse(body));
      });
   });
}

function sendManifestRequest() {
   return new Promise((resolve, reject) => {
      const options = {
         'url': 'http://www.bungie.net/Platform/Destiny2/Manifest/',
         'headers': {
            'X-Api-Key': cred,
         },
      };

      request.get(options, (err, res, body) => {
         resolve(JSON.parse(body));
      });
   });
   
}

main();