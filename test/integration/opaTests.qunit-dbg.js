/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZGBC_FLEET/ZGBC_FLEET/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});