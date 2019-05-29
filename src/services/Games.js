'use strict'

const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';
const OPTIONS = {
	'X-API-Key': BUNGIEAPIKEY
};

const GETPGCRURL = instaneid => {return `${BUNGIEROOTPATH}Destiny2/Stats/PostGameCarnageReport/${instaneid}/`};

const fetch = require("node-fetch");
// TODO: Remember to uninstall node-fetch when exporting to production

function GetPostGameReport(instanceid) {
   return fetch(GETPGCRURL(instanceid), {
      method: 'GET',
		mode: 'cors',
		headers: OPTIONS
   }).then(async response => {
      let temp = await response.json();
      return temp.Response;
   }).catch(reason => {
      throw reason;
   });
}

module.exports = {
   GetPostGameReport
};