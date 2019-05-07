
function overpass_query(query, db, callback)  {
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

module.exports = overpass_query;


//overpass_query('[out:json]; relation["name"="Firenze"]["type"="boundary"];out geom;', '/opt/overpass/db', callBack );




