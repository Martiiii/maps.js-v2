/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/maps.js":
/*!*********************!*\
  !*** ./src/maps.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var maps = {};
maps.mapsList = [];

window.maps = maps; // Check if a better alternative exists

maps.initMaps = function () {
	maps.mapsList.forEach(function (map) {
		map.initialize();
	});
};

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
		script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=geometry&callback=maps.initMaps';
		script.defer = true;
		script.async = true;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	this._map;
	this.mapDivId = mapDivId;

	maps.mapsList.push(this);
};

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/maps.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/maps.js */"./src/maps.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcHMuanMiXSwibmFtZXMiOlsibWFwcyIsIm1hcHNMaXN0Iiwid2luZG93IiwiaW5pdE1hcHMiLCJmb3JFYWNoIiwibWFwIiwiaW5pdGlhbGl6ZSIsIkdNYXAiLCJhcGlLZXkiLCJtYXBEaXZJZCIsImNyZWF0ZU1hcCIsImlkT2ZEaXYiLCJtYXBUeXBlIiwiZ29vZ2xlIiwiTWFwIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm1hcFR5cGVJZCIsIm1hcFR5cGVDb250cm9sIiwiY2VudGVyIiwiTGF0TG5nIiwiem9vbSIsInNjcm9sbHdoZWVsIiwiX3Byb2Nlc3NQb2ludHMiLCJnZW9tZXRyeSIsImNhbGxiYWNrIiwidGhpc0FyZyIsImNhbGwiLCJEYXRhIiwiUG9pbnQiLCJnZXQiLCJnZXRBcnJheSIsImciLCJmaXRBcmVhc09uU2NyZWVuIiwiYm91bmRzIiwiTGF0TG5nQm91bmRzIiwiX21hcCIsImRhdGEiLCJhZGRMaXN0ZW5lciIsImUiLCJmZWF0dXJlIiwiZ2V0R2VvbWV0cnkiLCJleHRlbmQiLCJmaXRCb3VuZHMiLCJsZW5ndGgiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiZGVmZXIiLCJhc3luYyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJwdXNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztB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QUFmO0FBQ0FELFNBQU9FLEdBQVAsb0RBQTREdkMsTUFBNUQ7QUFDQXFDLFNBQU9HLEtBQVAsR0FBZSxJQUFmO0FBQ0FILFNBQU9JLEtBQVAsR0FBZSxJQUFmO0FBQ0FsQyxXQUFTbUMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUNDLFdBQXpDLENBQXFETixNQUFyRDtBQUNBO0FBQ0QsTUFBS1QsSUFBTDtBQUNBLE1BQUszQixRQUFMLEdBQWdCQSxRQUFoQjs7QUFFQVQsTUFBS0MsUUFBTCxDQUFjbUQsSUFBZCxDQUFtQixJQUFuQjtBQUNBLENBYkYsQyIsImZpbGUiOiJtYXBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvbGliL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCBtYXBzID0ge307XG5tYXBzLm1hcHNMaXN0ID0gW107XG5cbndpbmRvdy5tYXBzID0gbWFwczsgLy8gQ2hlY2sgaWYgYSBiZXR0ZXIgYWx0ZXJuYXRpdmUgZXhpc3RzXG5cbm1hcHMuaW5pdE1hcHMgPSAoKSA9PiB7XG5cdG1hcHMubWFwc0xpc3QuZm9yRWFjaCgobWFwKSA9PiB7XG5cdFx0bWFwLmluaXRpYWxpemUoKTtcblx0fSk7XG59O1xuXG5tYXBzLkdNYXAgPSBjbGFzcyBHTWFwIHtcblx0Y29uc3RydWN0b3IoYXBpS2V5LCBtYXBEaXZJZCkge1xuXHRcdGlmIChtYXBzLm1hcHNMaXN0Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Y29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0XHRzY3JpcHQuc3JjID0gYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcz9rZXk9JHthcGlLZXl9JmxpYnJhcmllcz1nZW9tZXRyeSZjYWxsYmFjaz1tYXBzLmluaXRNYXBzYDtcblx0XHRcdHNjcmlwdC5kZWZlciA9IHRydWU7XG5cdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXHRcdH1cblx0XHR0aGlzLl9tYXA7XG5cdFx0dGhpcy5tYXBEaXZJZCA9IG1hcERpdklkO1xuXG5cdFx0bWFwcy5tYXBzTGlzdC5wdXNoKHRoaXMpO1xuXHR9XG5cblx0Y3JlYXRlTWFwID0gKGlkT2ZEaXYsIG1hcFR5cGUpID0+IHtcblx0XHRyZXR1cm4gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZE9mRGl2KSwge1xuXHRcdFx0bWFwVHlwZUlkOiBtYXBUeXBlLFxuXHRcdFx0bWFwVHlwZUNvbnRyb2w6IHRydWUsXG5cdFx0XHRjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTkuNDM2OTYyLCAyNC43NTM1NzQpLFxuXHRcdFx0em9vbTogNyxcblx0XHRcdHNjcm9sbHdoZWVsOiBmYWxzZVxuXHRcdH0pO1xuXHR9O1xuXG5cdF9wcm9jZXNzUG9pbnRzID0gKGdlb21ldHJ5LCBjYWxsYmFjaywgdGhpc0FyZykgPT4ge1xuXHRcdGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIGdvb2dsZS5tYXBzLkxhdExuZykge1xuXHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzQXJnLCBnZW9tZXRyeSk7XG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIGdvb2dsZS5tYXBzLkRhdGEuUG9pbnQpIHtcblx0XHRcdGNhbGxiYWNrLmNhbGwodGhpc0FyZywgZ2VvbWV0cnkuZ2V0KCkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRnZW9tZXRyeS5nZXRBcnJheSgpLmZvckVhY2goKGcpID0+IHtcblx0XHRcdFx0dGhpcy5fcHJvY2Vzc1BvaW50cyhnLCBjYWxsYmFjaywgdGhpc0FyZyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0Zml0QXJlYXNPblNjcmVlbiA9ICgpID0+IHtcblx0XHRjb25zdCBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cdFx0dGhpcy5fbWFwLmRhdGEuYWRkTGlzdGVuZXIoJ2FkZGZlYXR1cmUnLCAoZSkgPT4ge1xuXHRcdFx0dGhpcy5fcHJvY2Vzc1BvaW50cyhlLmZlYXR1cmUuZ2V0R2VvbWV0cnkoKSwgYm91bmRzLmV4dGVuZCwgYm91bmRzKTtcblx0XHRcdHRoaXMuX21hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHR9KTtcblx0fTtcblxuXHRpbml0aWFsaXplID0gKCkgPT4ge1xuXHRcdHRoaXMuX21hcCA9IHRoaXMuY3JlYXRlTWFwKHRoaXMubWFwRGl2SWQsICdoeWJyaWQnKTtcblx0XHR0aGlzLmZpdEFyZWFzT25TY3JlZW4oKTtcblx0fTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9