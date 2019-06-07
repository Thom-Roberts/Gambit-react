'use strict'

const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';
const OPTIONS = {
	'X-API-Key': BUNGIEAPIKEY
};
const SEARCHPLAYERURL = (name) => {return `Destiny2/SearchDestinyPlayer/-1/${name}/`};
const GETPROFILEURL = (membershipId, platformId) => {return `Destiny2/${platformId}/Profile/${membershipId}/?components=100`};
const GETHISTORICALSTATSURL = (membershipId, platformId, characterId) => {return `/Destiny2/${platformId}/Account/${membershipId}/Character/${characterId}/Stats?modes=64`;};

const gameRequests = require('./Games');
// TODO: Change requests to use the request library instead

function MembershipData(membershipId, membershipType) {
	this.membershipId = membershipId;
	this.membershipType = membershipType;
}

async function main(name) {
	try {
		let temp = await GetMembershipData(name);
		let memberObject = new MembershipData(temp.membershipId, temp.membershipType);

		// Array of character ids
		let characterIds = await GetProfile(memberObject.membershipId, memberObject.membershipType);
		
		// TODO: We can probably delay Promise.all'ing this until the last moment, since
		// we shouldn't need to manipulate this at all
		// Maybe if we need to fetch the hash ids from the database
		let historicalStats = characterIds.map(charId => {
			return GetHistoricalStats(memberObject.membershipId, memberObject.membershipType, charId);
		});

		let games = await gameRequests.GetGames(memberObject.membershipId, memberObject.membershipType, characterIds);

		// Now have a collection of games here

		return memberObject;
	}
	catch(e) {
		console.error(e);
		throw e;
	}
}

function GetMembershipData(name) {
	return fetch(BUNGIEROOTPATH + SEARCHPLAYERURL(name), {
		method: 'GET',
		mode: 'cors',
		headers: OPTIONS
	}).then(async response => {
		let temp = await response.json();
		return {
			'membershipId': temp.Response[0].membershipId,
			'membershipType': temp.Response[0].membershipType
		};
	}).catch(reason => {
		throw reason;
	});
}

function GetProfile(membershipId, platformId) {
	return fetch(BUNGIEROOTPATH + GETPROFILEURL(membershipId, platformId), {
		method: 'GET',
		mode: 'cors',
		headers: OPTIONS
	}).then(async response => {
		let temp = await response.json();
		return temp.Response.profile.data.characterIds;
	}).catch(reason => {
		throw reason;
	});
}

function GetHistoricalStats(membershipId, membershipType, characterId) {
	return fetch(BUNGIEROOTPATH + GETHISTORICALSTATSURL(membershipId, membershipType, characterId), {
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

module.exports = {
	main
};

main('Warrior342');

