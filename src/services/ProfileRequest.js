const BUNGIEAPIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
const BUNGIEROOTPATH = 'https://www.bungie.net/Platform/';
const OPTIONS = {
	'X-API-Key': BUNGIEAPIKEY
};
const SEARCHPLAYERURL = (name) => {return `Destiny2/SearchDestinyPlayer/-1/${name}/`};
const fetch = require("node-fetch");
// TODO: Remember to uninstall node-fetch when exporting to production

async function main(name) {
	try {
		let membershipData = await GetMembershipData(name);
		console.log(membershipData);
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

module.exports = {
	main
};

main('Warrior342');

