sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "ZFLEET_DELIVERY_TRUCK_REQ.ZFLEET_DELIVERY_TRUCK_REQ.view.",
		autoWait: true
	});
});