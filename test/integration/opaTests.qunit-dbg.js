/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZFLEET_DELIVERY_TRUCK_REQ/ZFLEET_DELIVERY_TRUCK_REQ/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});