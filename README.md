# overpass-wrapper

This is a simple wrapper around the command line utility named `osm3s_query` that ships with Overpass API. 

It can be used like this:


    const overpass_wrapper = require('overpass-wrapper');


    function callback(result, err) {

        console.log(result);
    }

    overpass_wrapper.overpassQuery('[out:json]; relation["name"="Firenze"]["type"="boundary"];out geom;', '/opt/overpass/db', callback );
`

The `osm3s_query` executable must be in the path.

The package provides three different functions:

- `overpassQuery(query_string, db_dir, callback)`: takes a query string in allowed Overpass format, the location of the Overpass database and a callback that will be invoked passing the result string
- `overpassQueryAsObject(query_string, db_dir, callback)`: same as previous function but converts the resulting JSON string into an object that will be passed to the callback
- `overpassQueryGeoJSON(query_string, db_dir, callback, options)`: this function will convert the OSM-JSON data to GeoJSON object that will be passed to the callback. The `options` parameter is optional and will be forwarded to `osmtogeojson` to control some conversion settings (see https://www.npmjs.com/package/osmtogeojson)

