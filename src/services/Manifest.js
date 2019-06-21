// const request = require('request');
// const fs = require('fs');
// const unzipper = require('unzipper');
// const path = require('path');
// const sqlite3 = require('sqlite3').verbose();
// const send = require('./SendRequest');
// const db = new sqlite3.Database('./db.sqlite3');

// async function GetManifest() {
// 	try {
// 		let manifest = await send(`https://www.bungie.net/Platform/Destiny2/Manifest/`);

//       await SendManifestRequest('https://www.bungie.net/' + manifest.Response.mobileWorldContentPaths.en);
      
//       return;
// 	}
// 	catch(e) {
// 		throw new Error(`Failed to fetch manifest: ${e}`);
// 	}
// }

// function LookupHash(tableName, hashId) {

// }

// function SendManifestRequest(url) {
//    return new Promise(async (resolve, reject) => {
      
//       await request(url).pipe(unzipper.Extract({path: __dirname})).promise();

//       const files = fs.readdirSync(__dirname);

//       for (let i in files) {
//          if (path.extname(files[i]) === ".content") {
//          fs.rename(files[i], "db.sqlite3", function(err) {
//             if (err) console.log("ERROR: " + err);
//          });
//          }
//       }

//       resolve();
//    });
// }

// module.exports = {
//    GetManifest,
// }