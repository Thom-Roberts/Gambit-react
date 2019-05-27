const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';
const OPTIONS = {
	'X-API-Key': BUNGIEAPIKEY
};
const SEARCHPLAYERURL = (name) => {return `Destiny2/SearchDestinyPlayer/-1/${name}/`};
const GETPROFILEURL = (membershipId, platformId) => {return `Destiny2/${platformId}/Profile/${membershipId}/?components=100`};

const fetch = require("node-fetch");
// TODO: Remember to uninstall node-fetch when exporting to production

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

		return membershipData;
	}
	catch(e) {
		console.error(e);
		//alert(e);
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

module.exports = {
	main
};

main('Warrior342');

