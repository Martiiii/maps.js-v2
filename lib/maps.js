'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var maps = {};
maps.mapsList = [];

maps.initMaps = function () {
	maps.mapsList.forEach(function (map) {
		map.initialize();
	});
};

window.initMaps = maps.initMaps;

maps.GMap = function GMap(apiKey, mapDivId) {
	var _this = this;

	_classCallCheck(this, GMap);

	this.createMap = function (idOfDiv, mapType) {
		return new google.maps.Map(document.getElementById(idOfDiv), {
			mapTypeId: mapType,
			mapTypeControl: true,
			center: new google.maps.LatLng(59.436962, 24.753574),
			zoom: 7,
			scrollwheel: false
		});
	};

	this._processPoints = function (geometry, callback, thisArg) {
		if (geometry instanceof google.maps.LatLng) {
			callback.call(thisArg, geometry);
		} else if (geometry instanceof google.maps.Data.Point) {
			callback.call(thisArg, geometry.get());
		} else {
			geometry.getArray().forEach(function (g) {
				_this._processPoints(g, callback, thisArg);
			});
		}
	};

	this.fitAreasOnScreen = function () {
		var bounds = new google.maps.LatLngBounds();
		_this._map.data.addListener('addfeature', function (e) {
			_this._processPoints(e.feature.getGeometry(), bounds.extend, bounds);
			_this._map.fitBounds(bounds);
		});
	};

	this.initialize = function () {
		_this._map = _this.createMap(_this.mapDivId, 'hybrid');
		_this.fitAreasOnScreen();
	};

	if (maps.mapsList.length === 0) {
		var script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=geometry&callback=initMaps';
		script.defer = true;
		script.async = true;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	this._map;
	this.mapDivId = mapDivId;

	maps.mapsList.push(this);
};