const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';

const GETACTIVITYHISTORYURL = (membershipId, platformId, characterId) => {return `/Destiny2/${platformId}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?mode=64`}
const GETPGCRURL = instanceid => {return `/Destiny2/Stats/PostGameCarnageReport/${instanceid}/`};

const send = require('./SendRequest').SendRequest;

async function GetGames(membershipId, membershipType, characterIds) {
	try {
		let activityHistory = characterIds.map(charId => {
			return GetActivityHistory(membershipId, membershipType, charId);
		});

		activityHistory = await Promise.all(activityHistory);

		let activityInstanceIds = activityHistory.map(charActivites => {
			return charActivites.Response.activities.map(activity => {
				return activity.activityDetails.instanceId;
			});
		});

		let gamePromises = activityInstanceIds.map(character => {
			return character.map(instanceId => {
				return GetPostGameReport(instanceId);
			});
		});;

		let games = [];

		for(let gameGroup of gamePromises) {
			let temp = await Promise.all(gameGroup);
			games.push(temp.map(game => {
				return game.Response;
			}));
		}

		return games;
	}
	catch(e) {
		throw new Error(`Failed to acquire games: ${e}`);
	}
}

async function GetActivityHistory(membershipId, membershipType, characterId) {
	return send(BUNGIEROOTPATH + GETACTIVITYHISTORYURL(membershipId, membershipType, characterId));
}


function GetPostGameReport(instanceid) {
	return send(BUNGIEROOTPATH + GETPGCRURL(instanceid));
}

export default {
	GetGames
}