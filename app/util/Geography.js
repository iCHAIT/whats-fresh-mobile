Ext.define('WhatsFresh.util.Geography', {

	// Class should be used statically.
	singleton: true,

	// WolframAlpha
	Reference: {
		Earth: {
			'average radius'	: 6367444.7,	// meters
			'oblateness'		: 0.0033528197	// unitless
		},
		Units: {
			'miles': {
				meters			: 1609.344
			},
			'meters': {
				meters			: 1.0
			}
		}
	},

	/**
	 * Calculates distance between two Earth surface coordinates.
	 * Uses haversine formula for great-circle minumum distance.
	 * DOES NOT use oblateness.
	 * DOES NOT use significant figures.
	 * From: http://www.movable-type.co.uk/scripts/latlong.html
	 * @param  {number} lat1	First point's latitude.
	 * @param  {number} lng1	First point's longitude.
	 * @param  {number} lat2	Second point's latitude.
	 * @param  {number} lng2	Second point's longitude.
	 * @return {number}			Sphere arc length in meters.
	 */
	getDistance: function (lat1, lng1, lat2, lng2) {
		var geo	= WhatsFresh.util.Geography;
		var R	= geo.Reference.Earth['average radius'];
		var lat1_radians = geo.degreesToRadians(lat1);
		var lat2_radians = geo.degreesToRadians(lat2);
		var difference_lat_radians = geo.degreesToRadians(lat2-lat1); // φ is latitude
		var difference_lng_radians = geo.degreesToRadians(lng2-lng1); // λ is longitude
		var a	= Math.sin(difference_lat_radians/2) * Math.sin(difference_lat_radians/2) +
					Math.cos(lat1_radians) * Math.cos(lat2_radians) *
					Math.sin(difference_lng_radians/2) * Math.sin(difference_lng_radians/2);
		var c	= 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d	= R * c;
		return d;
	},

	/**
	 * Only accepts what units are defined in Reference above.
	 */
	standardizeDistance: function (distanceRecord) {
		var Units = WhatsFresh.util.Geography.Reference.Units;
		return Units[distanceRecord.unit].meters * distanceRecord.value;
	},

	/* ------------------------------------------------------------------------
		Utility and Helper Functions
	------------------------------------------------------------------------ */

	// Converts Euclidean degrees into radians.
	degreesToRadians: function (degrees) {
		return degrees * Math.PI / 180;
	},

	// Converts Euclidean radians into degress.
	radiansToDegrees: function (radians) {
		return radians * 180 / Math.PI;
	}

});
