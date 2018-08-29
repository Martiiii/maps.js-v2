import { _processPoints, _createFeature } from './helperFunctions';
import shp from 'shpjs';

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
		this.areas = {};
		this.areaId = 0;
		this.listenMode = false;
		this.listenerHandle; // maybe need to have this as an array in the future
		this.selection = [];

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
			this.importGeoJson(_createFeature(geometryCoordinates, { areaId: this.areaId++ })); // Returns Data.Feature array
			this.saveAreas();
		});
	};

	// Add a GeoJson object to Data layer.
	importGeoJson = (geoJson) => {
		// TODO Options
		this._map.data.addGeoJson(geoJson, { idPropertyName: 'Id' });
	};

	saveAreas = () => {
		// Maybe can make it a bit more option-y
		this._map.data.toGeoJson((obj) => {
			this.areas = JSON.parse(JSON.stringify(obj)); // This is working for now. Maybe better solution in the future
		});
	};

	importShapefile = (filePath) => {
		// Path can be .shp file, .zip containing one or many .shp files
		shp(filePath).then((geoJson) => {
			if (Array.isArray(geoJson)) {
				geoJson.forEach((json) => {
					this.importGeoJson(json, { Id: this.areaId++ });
				});
			} else {
				this.importGeoJson(geoJson, { Id: this.areaId++ });
			}
			this.saveAreas();
		});
	};

	deleteArea = (area) => {
		// TODO more different types support (array, ...)
		if (typeof area === 'string' || typeof area === 'number') {
			this._map.data.remove(this._map.data.getFeatureById(area));
			this.saveAreas();
		} else if (area instanceof google.maps.Data.Feature) {
			this._map.data.remove(area);
			this.saveAreas();
		}
	};

	selectArea = (area) => {
		// TODO more different types support (array, ...)
		// options for enabling "selected" style, etc
		if (typeof area === 'string' || typeof area === 'number') {
			const feature = this._map.data.getFeatureById(area);
			this.selection.push(feature);
		} else if (area instanceof google.maps.Data.Feature) {
			this.selection.push(area);
		}
	};

	getSelectedAreas = () => this.selection;

	clearSelection = () => {
		this.selection.length = 0;
	};

	listenClicks = (callback, instantMode = true) => {
		this.listenMode = true;
		if (instantMode) {
			// Select areas and instantly execute some action
			this.listenerHandle = google.maps.event.addListener(
				this._map.data,
				'click',
				(event) => {
					console.log(event.feature);
					callback(event.feature);
				}
			);
		} else {
			// Select areas and in the end execute some action
		}
	};

	stopListeningClicks = () => {
		this.listenMode = false;
		google.maps.event.removeListener(this.listenerHandle);
	};
};
