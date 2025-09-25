sap.ui.define(
	[
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "sap/ui/core/message/Message",
    "sap/ui/core/MessageType",
    "sap/ui/core/ValueState",
    "sap/m/MessageToast",
    "sap/ui/core/library"
   ], 

function (Controller,JSONModel, BindingMode, Message, MessageType , ValueState , MessageToast, library ) {
	"use strict";
	return Controller.extend("ZGBC_FLEET.ZGBC_FLEET.controller.View1", {
		
		onInit: function () {
		          var oMessageManager,oView;
		            oView = this.getView();
		            oMessageManager = sap.ui.getCore().getMessageManager();
		            oView.setModel(oMessageManager.getMessageModel(), "message");
		            
		            var oData = {
		            	         VehicleType:[],
		            	         VehicleTypeVisbile:false,
		            	         VehicleSelected:null,
		            	         MonthlyRent:[],
		            	         MonthlyRentVisbible:false,
		            	         MonthlyRentSelected:null,
		            	         SumitRequestVisible:false
		                        };
		            this.oLocalModel =  new sap.ui.model.json.JSONModel(oData);
		            oView.setModel(this.oLocalModel,"localModel");
		            
		            var oDataResponse = {
		            	                Response :[],
		            	                Text:'',
		            	                Type:'',
		            	                Visible:false
		                                };
		            this.oLocalModel2 = new sap.ui.model.json.JSONModel(oDataResponse);
		            oView.setModel(this.oLocalModel2,"localModel2");                    
		    },
		   
		 
		  onSubmit: function (oEvent) {
					var Pernr = oEvent.getSource().getValue();
					var that = this;
					var sPath = "/EmployeeDetailsSet('" + Pernr + "')";
				    var oModel = this.getView().getModel();
		            	oModel.read(sPath, {
			                 	success: function(oData, response){
				                       	    var oModel3 = new sap.ui.model.json.JSONModel(oData);
					                        var osf = that.getView().byId("IdEmpDetail");
					                        osf.setModel(oModel3);
                                            that.getView().getModel("localModel").setProperty("/VehicleTypeVisbile",true);
                                            that.getView().getModel("localModel").setProperty("/MonthlyRentVisbible",true);
                                            var empsubgroup = that.getView().byId("idEmpSubGroup").getText();

					                        sPath = "/VehicleDropdownSet";
					                        var filter_string = "EmpSubgroup eq '" + empsubgroup+ "'";
					                        oModel.read(sPath, {
					                        	                urlParameters: {
																		            "$filter" : filter_string
																		        }, 
					                        	               	success: function (oData2, response2){
							                        	                          that.oLocalModel.setProperty("/VehicleType",oData2.results);
							                        	               	          var vehicle_selected = that.getView().getModel("localModel").getProperty("/VehicleType/0/VehicleKey");
				                                                    	          empsubgroup = that.getView().byId("idEmpSubGroup").getText();
		                                                     	                  sPath = "/InstallmentListSet";
																                  filter_string = "EmpSubGroup eq '" +empsubgroup + "' and VehicleType eq '" +vehicle_selected+"'";
																				  oModel.read(sPath, {
																					    	          urlParameters: {
																													"$filter" : filter_string
																													 }, 
																								               success: function (oData3, response3){
																								                                that.oLocalModel.setProperty("/MonthlyRent",oData3.results);
																								                                that.getView().getModel("localModel").setProperty("/SumitRequestVisible",true);
																						                 	                                       },
																								               error: function () {
																				     			                            	sap.m.MessageToast.show("No Data retreived");
																										                        	}
																								               });
			                 	                                                                     },
					                        	                error: function () {
								                            	sap.m.MessageToast.show("You are not eligible to create request");
							                                                    	}
					                                         });
                                        
			                                                    },
						   		error: function () {
						   			    that.getView().getModel("localModel").setProperty("/VehicleTypeVisbile",false);
                                        that.getView().getModel("localModel").setProperty("/MonthlyRentVisbible",false);
                                        that.getView().getModel("localModel").setProperty("/SumitRequestVisible",false);
								     	sap.m.MessageToast.show("No Data retreived");
							                      	}
							                      	
							                      	
		     					                      	

			});
		},
		
		
		onSelectVehicle: function( oEvent){
			var vehicle_selected = this.getView().getModel("localModel").getProperty("/VehicleSelected");
			var empsubgroup = this.getView().byId("idEmpSubGroup").getText();
			var oModel = this.getView().getModel();
			var  sPath = "/InstallmentListSet";
			/*?$filter=EmpSubGroup eq '" +empsubgroup + "' and VehicleType eq '" +vehicle_selected+"'";*/
			var filter_string = "EmpSubGroup eq '" +empsubgroup + "' and VehicleType eq '" +vehicle_selected+"'";
			var that = this;
		    oModel.read(sPath, {
		    	                 urlParameters: {
												"$filter" : filter_string
												 }, 
					             success: function (oData, response){
					                                that.oLocalModel.setProperty("/MonthlyRent",oData.results);
					                                that.getView().getModel("localModel").setProperty("/SumitRequestVisible",true);
			                 	                                       },
					               error: function () {
	     			                            	sap.m.MessageToast.show("No Data retreived");
							                        	}
					               });
			
			
			
	 	},
		
		   onSubmitRequest: function(oEvent){
		   	var flag           = "";
		 	var pernr          = this.getView().byId("idEmpid").getValue();
		 	var ename_en       = this.getView().byId("idNameEn").getText();
		 	var ename_ar       = this.getView().byId("idNameAr").getText();
		 	var pos_code       = this.getView().byId("idPositionCode").getText();
		 	var pos_en         = this.getView().byId("idPositionEn").getText();
		 	var pos_ar         = this.getView().byId("idPositionAr").getText();
		 	var dept_en        = this.getView().byId("idDepartmentEn").getText();
		 	var dept_ar        = this.getView().byId("idDepartmentAr").getText();
		 	var cocd           = this.getView().byId("idCocd").getText();
		 	var cocd_name      = this.getView().byId("idCompanyName").getText();
		 	var emp_subgrp     = this.getView().byId("idEmpSubGroup").getText();
		 	var subgroup_desc  = this.getView().byId("idEmpSubGroupDesc").getText();
		 	var iquama         = this.getView().byId("idIquama").getText();
		 	var dl             = this.getView().byId("idDl").getValue();
		 	var dl_id          = this.getView().byId("idDl");
		 	if ( dl === "")
		 	 {
		 	 	    dl_id.setValueState(ValueState.Error); // or just "Error"
                    dl_id.setValueStateText("Driving Liesence Is Required");
                    return;
		 	 }      
           else 
             {
             	   dl_id.setValueState(ValueState.None);
             }
		 	 
		 	
		 	var vehicle_selected =  this.getView().getModel("localModel").getProperty("/VehicleSelected");
		 	var monthly_rent     =  this.getView().getModel("localModel").getProperty("/MonthlyRentSelected");
		 	
		 	var oModel = this.getView().getModel();
		 	var that   = this;
		 
		 	
		 	var fleet_req_entry = {
						            Pernr : pernr,
                                    NameEn : ename_en,
                                    NameAr : ename_ar,
                                    PositionId : pos_code,
                                    PositionTextEn : pos_en,
                                    PositionTextAr : pos_ar,
                                    NatioEn          : "",
                                    NatioAr          : "",
                                    DepartmentEn     : dept_en,
                                    DepartmentAr     : dept_ar,
                                    IdNoEn           : iquama ,
                                    IdNoAr           : "",
                                    Cocd             : cocd,
                                    CocdDesc         : cocd_name,
                                    Dl               : dl,
                                    EmpSubgroup      : emp_subgrp,
                                    EmpSubgroupDesc : subgroup_desc,
                                    RequestHeaderToItemNav : [{
                                    	                         VehicleType : vehicle_selected ,
                                                                 InstallmentCat : monthly_rent
                                                             }]
				                    };
				                    
				 	oModel.create("/FleetRequestHeaderSet",
					              	fleet_req_entry, {
                                        	success: function(oData , response) {
                                        		    
													if (oData.Requestduplicate === 'X') {
									                    flag = "X";					
														sap.m.MessageToast.show("Duplicate Request being submitted.");
													}

													if (oData.Requesterror === 'X') {
														    flag = "X";	
															sap.m.MessageToast.show("Error while submitting request. Please Try again.");
													}

													if (flag !== 'X') {
													    that.oLocalModel2.setProperty("/Response",oData);
													    that.oLocalModel2.setProperty("/Type","Success");
													    that.oLocalModel2.setProperty("/Visible",true);
													    var RequestId = that.oLocalModel2.getProperty("/Response/RequestId");
													    var Text = "Service vehicle request :"  +RequestId+ " has been generated successfully";
													    sap.m.MessageToast.show(Text);
													    that.oLocalModel2.setProperty("/Text",Text);
														that.getView().getModel("localModel").setProperty("/SumitRequestVisible",false);
							                       	}
							                                },
										    	error: function(oError) {
										    		 var error_msg =  jQuery.parseJSON(oError.responseText).error.message.value;
										    		 sap.m.MessageToast.show(error_msg);
										             return;
													}

					               	});                      	                   
				                    
		 	
		    },
		
		   
		
			onMessagePopoverPress : function (oEvent) {
            this._getMessagePopover().openBy(oEvent.getSource());
            }, 
            
              _getMessagePopover : function () {
            // create popover lazily (singleton)
            if (!this._oMessagePopover) {
                this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(),"ZGBC_FLEET.ZGBC_FLEET.view.Fragment", this);
                this.getView().addDependent(this._oMessagePopover);
            }
            return this._oMessagePopover;
        }
	});
});