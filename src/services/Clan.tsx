// const request = require('request');
// const APIKEY = require('./BUNGIECRED').BUNGIEAPIKEY;
// const ClanId = '407685';

// function GetClanMembers() {
//    return new Promise((resolve, reject) => {
//       const options = {
//          'url': `http://bungie.net/Platform/GroupV2/${ClanId}/Members/`,
//          'headers': {
//             'x-api-key': APIKEY,
//          },
//       };
//       request.get(options, (err, res, body) => {
//          if(err) {
//             reject(err);
//          }
//          if(res.statusCode !== 200) {
//             reject(`Response not 200, ${res.statusCode}: ${res.statusMessage}`);
//          }

//          let temp = JSON.parse(body);

//          return temp['Response']['results'].filter((value) => {
//             if(value.hasOwnProperty('destinyUserInfo')) {
//                return {
//                   value.destinyUserInfo.membershipId
//                }
//             }
//          });

//          return temp['Response']['results'].map((value) => {
//             if(value.hasOwnProperty('destinyUserInfo')) {

//             }
//          });
//       });
//    }) ;  
// }
