# overpass-wrapper

This is a simple wrapper around the command line utility named osm2s_query that ships with Overpass API. 

It can be used like this:

`
const overpass_wrapper = require('overpass-wrapper');


function callback(result, err) {

    console.log(result);
}

overpass_wrapper.overpassQuery('[out:json]; relation["name"="Firenze"]["type"="boundary"];out geom;', '/opt/overpass/db', callback );
`
