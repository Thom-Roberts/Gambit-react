const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';
const SEARCHPLAYERURL = (name) => {return `/Destiny2/SearchDestinyPlayer/-1/${name}/`};
const GETPROFILEURL = (membershipId, platformId) => {return `/Destiny2/${platformId}/Profile/${membershipId}/?components=100`};
const GETHISTORICALSTATSURL = (membershipId, platformId, characterId) => {return `/Destiny2/${platformId}/Account/${membershipId}/Character/${characterId}/Stats/?modes=64`;};

const gameRequests = require('./Games');
const manifestRequests = require('./Manifest');
const send = require('./SendRequest').SendRequest;

function MembershipData(membershipId, membershipType) {
	this.membershipId = membershipId;
	this.membershipType = membershipType;
}

async function main(name) {
	try {
		let memberData = await GetMembershipData(name);
		let memberObject = new MembershipData(memberData.membershipId, memberData.membershipType);

		// Array of character ids
		let characterIds = await GetProfile(memberObject.membershipId, memberObject.membershipType);

		// TODO: We can probably delay Promise.all'ing this until the last moment, since
		// we shouldn't need to manipulate this at all
		// Maybe if we need to fetch the hash ids from the database

		let historicalStats = characterIds.map(charId => {
			return GetHistoricalStats(memberObject.membershipId, memberObject.membershipType, charId);
		});

		historicalStats = await Promise.all(historicalStats);

		//let games = await gameRequests.GetGames(memberObject.membershipId, memberObject.membershipType, characterIds);

		// Now have a collection of games here

		memberObject.characters = characterIds;

		memberObject.stats = historicalStats.map(characterStats => {
			return characterStats.Response.allPvECompetitive.allTime;
		});

		return memberObject;
	}
	catch(e) {
		console.error(e);
		throw e;
	}
}

async function GetMembershipData(name) {
	try {
		let data = await send(BUNGIEROOTPATH + SEARCHPLAYERURL(name));
		return {
			'membershipId': data.Response[0].membershipId,
			'membershipType': data.Response[0].membershipType
		};
	}
	catch(e) {
		throw new Error(`Could not fetch membership data: ${e}`);
	}
}

async function GetProfile(membershipId, platformId) {
	try {
		let prof = await send(BUNGIEROOTPATH + GETPROFILEURL(membershipId, platformId));
		return prof.Response.profile.data.characterIds;
	}
	catch(e) {
		throw new Error(`Could not fetch profile: ${e}`);
	}
}

async function GetHistoricalStats(membershipId, membershipType, characterId) {
	try {
		return send(BUNGIEROOTPATH + GETHISTORICALSTATSURL(membershipId, membershipType, characterId));
	}
	catch(e) {
		throw new Error(`Could not get historical stats: ${e}`);
	}
}

module.exports = {
	main
};

//main('Warrior342');

