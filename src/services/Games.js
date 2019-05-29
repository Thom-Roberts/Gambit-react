'use strict'

const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';
const OPTIONS = {
	'X-API-Key': BUNGIEAPIKEY
};

const GETACTIVITYHISTORYURL = (membershipId, platformId, characterId) => {return `/Destiny2/${platformId}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?mode=64`}
const GETPGCRURL = instaneid => {return `${BUNGIEROOTPATH}Destiny2/Stats/PostGameCarnageReport/${instaneid}/`};

const fetch = require("node-fetch");
// TODO: Remember to uninstall node-fetch when exporting to production

function GetGames(membershipId, membershipType, characterIds) {
   return new Promise(async (resolve, reject) => {
      let activityHistory = characterIds.map(charId => {
         return GetActivityHistory(membershipId, membershipType, charId);
      });

      activityHistory = await Promise.all(activityHistory);

      let activityInstanceIds = activityHistory.map(charActivites => {
			return charActivites.activities.map(activity => {
				return activity.activityDetails.instanceId;
			});
		});

      let gamePromises = [];

		activityInstanceIds.forEach(async character => {
			let characterGameReports = [];
			character.forEach(instanceId => {
				
				let val = GetPostGameReport(instanceId);

				characterGameReports.push(val);
			});
			gamePromises.push(characterGameReports);
		});

		let games = [];
		for(let game of gamePromises) {
			let temp = await Promise.all(game);
			games.push(temp);
      }
      
      resolve(games);

   });
}

function GetActivityHistory(membershipId, membershipType, characterId) {
	return fetch(BUNGIEROOTPATH + GETACTIVITYHISTORYURL(membershipId, membershipType, characterId), {
		method: 'GET',
		mode: 'cors',
		headers: OPTIONS,
	}).then(async response => {
		let temp = await response.json();
		return temp.Response;
	}).catch(reason => {
		throw reason;
	});
}


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
   GetGames
};