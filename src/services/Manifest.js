const request = require('request');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');

async function GetManifest() {
	try {
		let manifest = await send(`${BUNGIEROOTPATH}Destiny2/Manifest/`);

		await SendManifestRequest('https://www.bungie.net/' + manifest.Response.mobileWorldContentPaths.en);

		return 'Finished';
	}
	catch(e) {
		throw new Error(`Failed to fetch manifest: ${e}`);
	}
}

function SendManifestRequest(url) {
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
   GetManifest,
}