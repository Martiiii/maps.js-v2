export const _processPoints = (geometry, callback, thisArg) => {
	if (geometry instanceof google.maps.LatLng) {
		callback.call(thisArg, geometry);
	} else if (geometry instanceof google.maps.Data.Point) {
		callback.call(thisArg, geometry.get());
	} else {
		geometry.getArray().forEach((g) => {
			this._processPoints(g, callback, thisArg);
		});
	}
};
