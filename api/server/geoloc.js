function randomGeo(center, radius) {
    var y0 = center.latitude;
    var x0 = center.longitude;
    var rd = radius / 111300; //about 111300 meters in one degree

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    //Adjust the x-coordinate for the shrinking of the east-west distances
    var xp = x / Math.cos(y0);

    var newlat = y + y0;
    var newlon = x + x0;
    var newlon2 = xp + x0;

    return {
    		'type' : 'Feature',
        'geometry' : {
        	"type": "Point",
          "coordinates": [
          parseFloat(newlat.toFixed(15)),
          parseFloat(newlon.toFixed(15))
        ]
        },
        'properties' : {}
    };
}

function distance(lat1, lon1, lat2, lon2) {
    var R = 6371000;
    var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
}

var mappoints = [];
    for (var i=0; i<100; i++) {
        mappoints.push(randomGeo({
latitude : 440.2563,
longitude : 13.1165
}, 10000));
    }

console.log(JSON.stringify(mappoints));

