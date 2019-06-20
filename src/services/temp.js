const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db.sqlite3', (err) => {
   if(err) {
      console.error(err);
   }
});

let sql = `	SELECT *
From DestinyRaceDefinition
WHERE id = 898834093
`;

db.all(sql, [], (err, rows) => {
   if (err) {
     throw err;
   }
   rows.forEach((row) => {
     console.log(row.json);
   });
 });
  
 // close the database connection
 db.close();