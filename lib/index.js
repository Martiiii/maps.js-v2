import { _processPoints, _createFeature } from './helperFunctions';

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
			center: mapProperties.center || new google.maps.LatLng(59.436962, 24.753574),
			zoom: mapProperties.zoom || 7,
			backgroundColor: mapProperties.backgroundColor,
			clickableIcons: mapProperties.clickableIcons || true,
			disableDefaultUI: mapProperties.disableDefaultUI,
			draggableCursor: mapProperties.draggableCursor,
			draggingCursor: mapProperties.draggingCursor,
			fullscreenControl: mapProperties.fullscreenControl,
			fullscreenControlOptions: mapProperties.fullscreenControlOptions,
			gestureHandling: mapProperties.gestureHandling,
			heading: mapProperties.heading,
			keyboardShortcuts: mapProperties.keyboardShortcuts,
			mapTypeId: mapProperties.mapType,
			mapTypeControl: mapProperties.mapTypeControl,
			mapTypeControlOptions: mapProperties.mapTypeControlOptions,
			maxZoom: mapProperties.maxZoom,
			minZoom: mapProperties.minZoom,
			noClear: mapProperties.noClear,
			panControl: mapProperties.panControl,
			panControlOptions: mapProperties.panControlOptions,
			rotateControl: mapProperties.rotateControl,
			rotateControlOptions: mapProperties.rotateControlOptions,
			scaleControl: mapProperties.scaleControl,
			scaleControlOptions: mapProperties.scaleControlOptions,
			streetView: mapProperties.streetView,
			streetViewControl: mapProperties.streetViewControl,
			streetViewControlOptions: mapProperties.streetViewControlOptions,
			styles: mapProperties.styles,
			tilt: mapProperties.tilt,
			zoomControl: mapProperties.zoomControl,
			zoomControlOptions: mapProperties.zoomControlOptions,
			scrollwheel: mapProperties.scrollwheel
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
				drawingModes: ['polygon'] // ['marker', 'polyline', 'rectangle', 'circle', 'polygon']
			}
		});
		drawingManager.setMap(this._map);

		google.maps.event.addListenerOnce(drawingManager, 'polygoncomplete', (polygon) => {
			polygon.setMap(null); // This removes duplicate Polygon that is not on the Data layer.
			const geometryCoordinates = [];
			for (let point of polygon.getPath().getArray()) {
				geometryCoordinates.push([point.lng(), point.lat()]);
			}
			drawingManager.setMap(null);
			// Second arg of addGeoJson defines what prop is used as the id.  If not specified, the GeoJSON Feature id will be used.
			this._map.data.addGeoJson(_createFeature(geometryCoordinates)); // Returns Data.Feature array
			this._map.data.toGeoJson((obj) => {
				this.areas = JSON.parse(JSON.stringify(obj)); // This is working for now. Maybe better solution in the future
			});
		});
	};
};
