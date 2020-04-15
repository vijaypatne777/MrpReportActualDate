/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/qb2i4/qb2i4/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});