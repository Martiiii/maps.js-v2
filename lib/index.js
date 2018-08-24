import { _processPoints } from './helperFunctions';

const maps = {};
maps.mapsList = [];

window.maps = maps; // Check if a better alternative exists

maps.initMaps = () => {
	maps.mapsList.forEach((map) => {
		map.initialize();
	});
};

maps.GMap = class GMap {
	constructor(apiKey, mapDivId) {
		if (maps.mapsList.length === 0) {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=maps.initMaps`;
			script.defer = true;
			script.async = true;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		this._map;
		this.mapDivId = mapDivId;

		maps.mapsList.push(this);
	}

	createMap = (idOfDiv, mapType) => {
		return new google.maps.Map(document.getElementById(idOfDiv), {
			mapTypeId: mapType,
			mapTypeControl: true,
			center: new google.maps.LatLng(59.436962, 24.753574),
			zoom: 7,
			scrollwheel: false
		});
	};

	fitAreasOnScreen = () => {
		const bounds = new google.maps.LatLngBounds();
		this._map.data.addListener('addfeature', (e) => {
			_processPoints(e.feature.getGeometry(), bounds.extend, bounds);
			this._map.fitBounds(bounds);
		});
	};

	initialize = () => {
		this._map = this.createMap(this.mapDivId, 'hybrid');
		this.fitAreasOnScreen();
	};
};
