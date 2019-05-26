const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';
const OPTIONS = {
	'X-API-Key': BUNGIEAPIKEY
};
const SEARCHPLAYERURL = (name) => {return `Destiny2/SearchDestinyPlayer/-1/${name}/`};
const fetch = require("node-fetch");

async function main(name) {
	try {
		let membershipData = await GetMembershipData(name);
		console.log(membershipData);
		return membershipData;
	}
	catch(e) {
		console.error(e);
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
	});
}

module.exports = {
	main
};

//main('Warrior342');

