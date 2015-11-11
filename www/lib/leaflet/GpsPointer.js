

(function (window, document, L) {
    "use strict";
    /*
     * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
     */

    L.GpsPointer = {};

    L.GpsPointer.version = '0.1.0';

    /* */
	L.GpsPointer = L.Icon.extend({
		options: {
			iconSize: [12, 12], // also can be set through CSS
			/*
			iconAnchor: (Point)
			popupAnchor: (Point)
			html: (String)
			bgPos: (Point)
			*/
			className: 'leaflet-div-icon',
			html: false
		},

		createIcon: function (oldIcon) {
			var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
			    options = this.options;

			if (options.html !== false) {
				div.innerHTML = options.html;
			} else {
				div.innerHTML = '';
			}

			if (options.bgPos) {
				div.style.backgroundPosition =
				        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
			}

			this._setIconStyles(div, 'icon');
			return div;
		},

		createShadow: function () {
			return null;
		}
	});

	L.gpsPointer = function (options) {
		return new L.GpsPointer(options);
	};

}(this, document));