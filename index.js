
const osmtogeojson = require('osmtogeojson');


function overpassQuery(query, db, callback)  {
    const spawn = require('child_process').spawn;

    let osm3s = spawn("osm3s_query", [ `--db-dir=${db}` ], {stdio: ['pipe', 'pipe', 'pipe']});

    let result = '';
    let err;

    osm3s.stdout.on('data', function(data) {

         result += data.toString();
    });

    osm3s.stderr.on('data', function(data) {

         err += data.toString();

    });

    osm3s.on('close', function(code) {
        return callback(result, err);
    });

    
    osm3s.stdin.end(query+"\n");


};

function overpassQueryAsObject(query, db, callback) {
    overpassQuery(query, db, (result, err) => { 
        callback(JSON.parse(result), err);
    });
}


function overpassQueryGeoJSON(query, db, callback, options) {
    overpassQueryAsObject(query, db, (jsonObject, err) => { 
        callback(osmtogeojson(jsonObject, options), err);
    });

};

module.exports.overpassQuery = overpassQuery;
module.exports.overpassQueryAsObject = overpassQueryAsObject;
module.exports.overpassQueryGeoJSON = overpassQueryGeoJSON;

//overpassQuery('[out:json]; relation["name"="Firenze"]["type"="boundary"];out geom;', '/opt/overpass/db', callBack );

//overpassQueryJSON('[out:json]; relation["name"="Firenze"]["type"="boundary"];out geom;', '/opt/overpass/db', callBack );


