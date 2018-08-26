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

	constructor(apiKey, mapDivId, mapProperties) {
		if (maps.mapsList.length === 0) {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,drawing&callback=maps.initMaps`;
			script.defer = true;
			script.async = true;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		//this._map;
		this.mapDivId = mapDivId;
		this.mapProperties = mapProperties;
		this.areas = [];

		maps.mapsList.push(this);
	}

	createMap = (idOfDiv, mapProperties) => {
		return new google.maps.Map(document.getElementById(idOfDiv), {
			mapTypeId: mapProperties.mapType || "hybrid",
			mapTypeControl: mapProperties.mapTypeControl || true,
			center: mapProperties.center || new google.maps.LatLng(59.436962, 24.753574),
			zoom: mapProperties.zoom || 7,
			scrollwheel: mapProperties.scrollwheel || false
			// TODO: Remove the default values from behind of the properties other than CENTER and ZOOM (required). Add missing properties.
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
		this._map = this.createMap(this.mapDivId, this.mapProperties);
		//this.fitAreasOnScreen();
		console.log(this.areas);
	};


	createArea = () => {
		let drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: ['polygon', 'polyline', 'rectangle']
			}
		});

		let GeoJSON = {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: []
			},
			properties: {}
		};

		drawingManager.setMap(this._map);

		google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
			drawingManager.setMap(null);
			for (let point of polygon.getPath().getArray()) {
				GeoJSON.geometry.coordinates.push([point.lng(), point.lat()]);
			}
			this.areas.push(GeoJSON);
		});
	};
};
