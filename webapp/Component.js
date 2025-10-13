sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "ZFLEET_DELIVERY_TRUCK_REQ/ZFLEET_DELIVERY_TRUCK_REQ/model/models"], 
    (e, t, i) => {
        "use strict";
         return e.extend("ZFLEET_DELIVERY_TRUCK_REQ.ZFLEET_DELIVERY_TRUCK_REQ.Component", {
            metadata: { manifest: "json" },
            init: function () {
                e.prototype.init.apply(this, arguments);
                this.getRouter().initialize();
                this.setModel(i.createDeviceModel(), "device");
            }
        });
    });