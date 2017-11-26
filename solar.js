
var Solar = {



  // get the latitude and longitude where the sun is directly overhead.
  // default uses current time, or pass a unix time in milliseconds
  getCoordinates: function(time) {

    function toRadians (angle) {
     return angle * (Math.PI / 180);
    }

    function toDegrees (angle) {
     return angle * (180 / Math.PI);
    }

    function getJulianTime(time) {
     var unixtime = time/1000;
     return unixtime / 86400 + 2440587.5;
    }

    var n;
    if (arguments.length === 0) {
      n = getJulianTime((new Date).getTime()) - 2451545.0;
    } else {
      n = getJulianTime(time) - 2451545.0;
    }

    var l = (280.460 + 0.9856474*n) % 360;
    var g = (357.528 + 0.9856003*n) % 360;

    var gr = toRadians(g)

    var lambda = (l + 1.915*Math.sin(gr) + 0.020*Math.sin(2*gr)) % 360;

    //var r = 1.00014 - 0.01671*Math.cos(gr) - 0.00014*Math.cos(2*gr)

    var e = 23.439 - 0.0000004*n;

    var er = toRadians(e);
    var lambdar = toRadians(lambda);

    var a = toDegrees(Math.atan2(Math.cos(er)*Math.sin(lambdar), Math.cos(lambdar)));

    var d = toDegrees(Math.asin(Math.sin(er)*Math.sin(lambdar)));
    var t = n / 36525.0;
    var t2 = t*t;
    var t3 = t2*t;

    var gst = 280.46061837 + 360.98564736629*n + 0.000387933*t2 - t3/38710000.0;

    var gha = (a - gst) % 360;

    return [d, gha];
  }
}
