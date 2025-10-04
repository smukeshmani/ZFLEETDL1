var MOTDate = '';
var DLDate = '';
var RequestId = '';

sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/BindingMode",
		"sap/ui/core/message/Message",
		"sap/ui/core/MessageType",
		"sap/ui/core/ValueState",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"sap/ui/core/library",
		"sap/ui/model/Filter",
		"sap/ui/core/Fragment",
		"sap/ui/model/FilterOperator"
	],

	function (Controller, JSONModel, BindingMode, Message, MessageType, ValueState, MessageToast, MessageBox, library, Filter, Fragment,
		FilterOperator) {
		"use strict";

		return Controller.extend("ZFLEET_DELIVERY_TRUCK_REQ.ZFLEET_DELIVERY_TRUCK_REQ.controller.View1", {

			onInit: function () {
				var oMessageManager, oView;
				oView = this.getView();
				oMessageManager = sap.ui.getCore().getMessageManager();
				oView.setModel(oMessageManager.getMessageModel(), "message");
				var objViol = [];
				this.filenameLicense = {};
				this.filetypeLicense = {};
				objViol = [{
					No: "1",
					DescAr: "عدم الاحتفاظ بطاقة التشغيل داخل المركبة",
					DescEn: "Operation card is not available in the truck.",
					Ownership: "Driver",
					Amount: "2000"
				}, {
					No: "2",
					DescAr: "سير المركبة بلا لوحة امامية",
					DescEn: "Driving a vehicle without front plates",
					Ownership: "Driver",
					Amount: "1000"
				}, {
					No: "3",
					DescAr: "سير المركبة بلا لوحة خلفية أو بلا لوحات",
					DescEn: "Driving a vehicle without front plates",
					Ownership: "Driver",
					Amount: "1000"
				}, {
					No: "4",
					DescAr: "قيادة المركبة بلوحات غير واضحة",
					DescEn: "Driving a vehicle with unclear or damaged license plates",
					Ownership: "Driver",
					Amount: "1000"
				}, {
					No: "5",
					DescAr: "عدم الالتزام بحدود المسارات",
					DescEn: "Non-compliance with the limits of selected tracks on the road",
					Ownership: "Driver",
					Amount: "300"
				}, {
					No: "6",
					DescAr: "وقوف المركبة في اماكن غير مخصصة للوقوف",
					DescEn: "Wrong Parking",
					Ownership: "Driver",
					Amount: "100"
				}, {
					No: "7",
					DescAr: "استخدام السائق بيده أي جهاز محمول اثناء سير المركبة -رصد آلي",
					DescEn: "Using a cell phone or other electronic device in hand",
					Ownership: "Driver",
					Amount: "500"
				}, {
					No: "8",
					DescAr: "عدم ربط حزام الامان - رصد آلي",
					DescEn: "Seat belt not applied",
					Ownership: "Driver",
					Amount: "150"
				}, {
					No: "9",
					DescAr: "تجاوز السرعة المحددة باكثر من 10 الى 20 كلم/س  - رصد آلي",
					DescEn: "Overspeeding 10 to 20 Kmph",
					Ownership: "Driver",
					Amount: "150"
				}, {
					No: "10",
					DescAr: "تجاوز السرعة المحددة باكثر من 20 الى 30 كلم/س  - رصد آلي",
					DescEn: "Overspeeding 20 to 30 Kmph",
					Ownership: "Driver",
					Amount: "300"
				}, {
					No: "11",
					DescAr: "تجاوز اشارة المرور الضوئية اثناء الضوء الاحمر - رصد آلي",
					DescEn: "Passing the red signal light",
					Ownership: "Driver",
					Amount: "3000"
				}, {
					No: "12",
					DescAr: "عدم الالتزام بحدود المسارات المحددة على الطريق - رصد آلي",
					DescEn: "Not following the right tracks",
					Ownership: "Driver",
					Amount: "300"
				}, {
					No: "13",
					DescAr: "عدم وجود انارة جانبية أو عواكس  أو سواتر للشاحنات والمقطورات",
					DescEn: "The absence of side lighting or reflectors for trailers",
					Ownership: "Driver",
					Amount: "1000"
				}, {
					No: "14",
					DescAr: "مخالفة عدم تسليم اصل رخصة سير",
					DescEn: "Original Istimarah is not available in the Vehicle",
					Ownership: "Driver",
					Amount: "300"
				}, {
					No: "15",
					DescAr: "عدم حمل رخصة القيادة أو رخصة السير",
					DescEn: "Original Istimarah or Driving Licence is not available in the Vehicle",
					Ownership: "Driver",
					Amount: "300"
				}];
				var oData = {
					Vehicleid: "",
					VehicleName: "",
					VehicleNumber: "",
					VehicleVendor: "",
					Plant: "",
					Location: "",
					CostCenter: "",
					VehicleDetVisible: false,
					SumitRequestVisible: false,
					IdVehicleCheckList: true,
					idfileChkListBtn: true,
					idVehicleId: false,
					idDriverMobile: false,
					idAccept: false,
					idD2: true,
					idD3: true,
					idfileCheckList: true,
					idfileDL: true,
					idfileMOT: true,
					idFrontUpload: true,
					idLeftUpload: true,
					idRightUpload: true,
					idBackUpload: true,
					violationCollection: objViol
				};
				this.oLocalModel = new sap.ui.model.json.JSONModel(oData);
				oView.setModel(this.oLocalModel, "localModel");

				var oDataResponse = {
					Response: [],
					Text: '',
					Type: '',
					Visible: false
				};
				this.oLocalModel2 = new sap.ui.model.json.JSONModel(oDataResponse);
				oView.setModel(this.oLocalModel2, "localModel2");
				// oModel.loadData("/model/violation.json");
				// var oModel3 = new JSONModel("/model/violation.json");
				// this.getView().setModel(oModel3, "localModel3");
			},
			handleChangeLocal: function (oEvent) {

			},
			handleFile: function (oEvent) {
				//debugger;
				// var oFileUploader = this.getView().byId("idfileCheckLists");
				sap.m.MessageToast.show("File Size exceeds 1 MB Size, Please uploade below 1MB File");
			},
			handleFile_2MB: function (oEvent) {
				sap.m.MessageToast.show("File Size exceeds 2 MB Size, Please uploade below 2MB File");
			},
			onDatePickerChange: function (oEvent) {
				// Format date to remove UTC issue
				var oDatePicker = oEvent.getSource();
				var oBinding = oDatePicker.getBinding("dateValue");
				var oNewDate = oDatePicker.getDateValue();
				if (oNewDate) {
					var sPath = oBinding.getContext().getPath() + "/" + oBinding.getPath();
					var oFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "yyyy-MM-ddTKK:mm:ss"
					});
					oBinding.getModel().setProperty(sPath, new Date(oFormatDate.format(oNewDate)));
				}
			},
			viewImage: function (evt) {
				var obtn = evt.getSource();
				//now you have access to the respective button
				var customData = obtn.getCustomData()[0].getValue();
				// sap.m.MessageToast.show("button Clicked:" + customData)
				if (!this.displayContent) {
					this.displayContent = sap.ui.xmlfragment("ZFLEET_DELIVERY_TRUCK_REQ.ZFLEET_DELIVERY_TRUCK_REQ.fragments.filepreview", this);
					this.getView().addDependent(this.displayContent);
				}
				sap.ui.getCore().byId("idPdfViewer").setVisible(false);
				sap.ui.getCore().byId("image").setVisible(true);
				sap.ui.getCore().byId("image").setSrc(customData);
				this.displayContent.open();

			},
			onEnterVechile: function (oEvent) {
				var vechileId = oEvent.getSource().getValue().toString().toUpperCase();
				var that = this;
				// var that = this;
				var btnHandler = function (evt) {
					that.viewImage(evt);
				};
				var oModel = this.getView().getModel();
				var sPath = "/VehicleDetails3Set('" + vechileId + "')";
				oModel.read(sPath, {
					success: function (oData2, response2) {
						if (oData2 !== null && (oData2.VehicleId !== null && oData2.VehicleId !== "")) {
							debugger;
							if (oData2.VehicleStatus === "E") {
								sap.m.MessageBox.alert(
									oData2.Message, {
										onClose: function (oAction) {
											//	window.print();

										}
									});
								that.getView().getModel("localModel").setProperty("/VehicleDetVisible", false);
							} else {
								that.byId("idVechileName").setText(oData2.VehicleNo);
								// that.getView().getModel("localModel").setProperty("/SumitRequestVisible", true);
								that.oLocalModel.setProperty("/Vehicleid", oData2.VehicleId);
								that.oLocalModel.setProperty("/VehicleName", oData2.VehicleText);
								that.oLocalModel.setProperty("/VehicleVendor", oData2.VehicleVendor);
								that.oLocalModel.setProperty("/VehicleNumber", oData2.VehicleNo);
								that.oLocalModel.setProperty("/Plant", oData2.VehiclePlant);
								that.oLocalModel.setProperty("/Location", oData2.VehicleLoc);
								that.oLocalModel.setProperty("/CostCenter", oData2.VehicleCc);
								that.getView().getModel("localModel").setProperty("/idVehicleId", false);
								that.getView().getModel("localModel").setProperty("/idDriverMobile", true);
								that.getView().getModel("localModel").setProperty("/VehicleDetVisible", true);
								that.getView().getModel("localModel").setProperty("/idAccept", true);
								var oModelDoc = that.getOwnerComponent().getModel();

								var myFilter = new sap.ui.model.Filter("FleetId", sap.ui.model.FilterOperator.EQ, (VehicleId));
								oModelDoc.read("/FleetReqDocumentsSet", {
									filters: [myFilter],
									success: function (oDataImages, response1) {
										debugger;
										var oDataImagesData = new sap.ui.model.json.JSONModel(oDataImages);
										// oDataImagesData.setData(oDataImages);
										that.getView().setModel(oDataImagesData, "imagesButton");
										var oPanelLeft = that.getView().byId("idFleetImagesLeft");
										var oPanelRight = that.getView().byId("idFleetImagesRight");
										var oPanelFront = that.getView().byId("idFleetImagesFront");
										var oPanelBack = that.getView().byId("idFleetImagesBack");
										var oImages = [];
										oImages = oDataImages.results;
										for (let i = 0; i < oImages.length; i++) {
											let image = oImages[i];
											let name = "";
											if (image.AwsFileName !== "") {
												name = image.Zdate.toLocaleDateString();
												// value: "/fleet/"+image.AwsFileName 
												let oButton = new sap.m.Button({
														id: image.AwsFileName,
														text: name,
														type: "Accept",
														press: btnHandler,
														customData: new sap.ui.core.CustomData({
															key: "AwsFilePath",
															value: image.AwsFilePath

														})
													})
													// oPanel.addContent(oButton);
												if (image.DocType === "RIM") {
													oPanelRight.addContent(oButton);
												} else if (image.DocType === "BIM") {
													oPanelBack.addContent(oButton);
												} else if (image.DocType === "LIM") {
													oPanelLeft.addContent(oButton);
												} else if (image.DocType === "FIM") {
													oPanelFront.addContent(oButton);
												}
											}
										}
									},
									error: function () {
										sap.m.MessageToast.show("No Data retreived");
									}
								});
							}
						} else {
							that.getView().getModel("localModel").setProperty("/VehicleDetVisible", false);
						}
					},

					error: function () {
						that.oLocalModel.setProperty("/Vehicleid", "");
						that.oLocalModel.setProperty("/VehicleName", "");
						that.oLocalModel.setProperty("/VehicleVendor", "");
						that.oLocalModel.setProperty("/VehicleNumber", "");
						that.oLocalModel.setProperty("/Plant", "");
						that.oLocalModel.setProperty("/Location", "");
						that.getView().getModel("localModel").setProperty("/VehicleDetVisible", false);
						that.getView().getModel("localModel").setProperty("/SumitRequestVisible", false);
					}
				});
			},
			onSubmit: function (oEvent) {
				debugger;
				var Pernr = oEvent.getSource().getValue();
				var that = this;
				var sPath = "/EmployeeDetailsSet('" + Pernr + "')";
				var oModel = this.getView().getModel();
				oModel.read(sPath, {
					success: function (oData, response) {
						var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var osf = that.getView().byId("IdEmpDetail");
						osf.setModel(oModel3);
						// that.getView().getModel("localModel").setProperty("/SumitRequestVisible", true);
						//that.getView().getModel("localModel").setProperty("/VehicleDetVisible",true);
						sPath = "/VehicleDetailsSet('" + Pernr + "')";
						oModel.read(sPath, {
							success: function (oData2, response2) {
								that.oLocalModel.setProperty("/Vehicleid", oData2.VehicleId);
								that.oLocalModel.setProperty("/VehicleName", oData2.VehicleText);
								that.oLocalModel.setProperty("/VehicleVendor", oData2.VehicleVendor);
								that.oLocalModel.setProperty("/VehicleNumber", oData2.VehicleNo);
								that.oLocalModel.setProperty("/Plant", oData2.VehiclePlant);
								that.oLocalModel.setProperty("/Location", oData2.VehicleLoc);
								that.oLocalModel.setProperty("/CostCenter", oData2.VehicleCc);
								that.getView().getModel("localModel").setProperty("/idVehicleId", true);
								that.getView().getModel("localModel").setProperty("/idDriverMobile", true);
								if (that.getView().getModel("localModel").getProperty("/Vehicleid") === "") {
									that.getView().getModel("localModel").setProperty("/VehicleDetVisible", false);
								} else {
									that.getView().getModel("localModel").setProperty("/VehicleDetVisible", true);
								}
							},

							error: function () {
								that.oLocalModel.setProperty("/Vehicleid", "");
								that.oLocalModel.setProperty("/VehicleName", "");
								that.oLocalModel.setProperty("/VehicleVendor", "");
								that.oLocalModel.setProperty("/VehicleNumber", "");
								that.oLocalModel.setProperty("/Plant", "");
								that.oLocalModel.setProperty("/Location", "");
								that.getView().getModel("localModel").setProperty("/VehicleDetVisible", false);
							}
						});
					},
					error: function () {
						that.getView().getModel("localModel").setProperty("/SumitRequestVisible", false);
						sap.m.MessageToast.show("No Data retreived");
					}
				});
			},
			handleChangeLocalMOT: function (oEvent) {
				MOTDate = this.getView().byId("idD3").getValue();
				this.getView().byId('idD3').setValueState(sap.ui.core.ValueState.none);

			},
			handleChangeLocalDL: function (oEvent) {
				DLDate = this.getView().byId("idD2").getValue();
				this.getView().byId('idD2').setValueState(sap.ui.core.ValueState.none);

			},
			openIshtimarahFile: function (oEvent) {

				var Zftype = 'ISH';
				this.openDocument(oEvent, Zftype, true);

			},
			openInsuranceFile: function (oEvent) {

				var Zftype = 'INS';
				this.openDocument(oEvent, Zftype, true);

			},
			openMOTCard: function (oEvent) {

				var Zftype = 'MOT';
				this.openDocument(oEvent, Zftype, true);

			},
			openMVPIDocument: function (oEvent) {

				var Zftype = 'MVPI';
				this.openDocument(oEvent, Zftype, true);

			},
			openCheckFile: function (oEvent) {
				var Zftype = 'CKL';
				this.openDocument(oEvent, Zftype, false);

			},
			openSASOCertificateFile: function (oEvent) {

				var Zftype = 'SASO';
				this.openDocument(oEvent, Zftype, true);

			},
			openDLFile: function (oEvent) {
				var Zftype = 'MOTD';
				this.openDocument(oEvent, Zftype, false);
			},
			openMOTCardDrvFile: function (oEvent) {
				var Zftype = 'DL';
				this.openDocument(oEvent, Zftype, false);
			},
			openRightBtn: function (oEvent) {
				var Zftype = 'RIM';
				this.openDocument(oEvent, Zftype, true);
			},
			openLeftBtn: function (oEvent) {
				var Zftype = 'LIM';
				this.openDocument(oEvent, Zftype, true);
			},
			openFrontBtn: function (oEvent) {
				var Zftype = 'FIM';
				this.openDocument(oEvent, Zftype, true);
			},
			openBackBtn: function (oEvent) {
				var Zftype = 'BIM';
				this.openDocument(oEvent, Zftype, true);
			},
			openDocument: function (oEvent, Zftype, fleet) {
				var vechId = this.getView().byId("idPlateNo").getValue();

				if (Zftype !== "") {
					//call SAP and get file data
					var that = this;
					var oModel = that.getOwnerComponent().getModel();
					if (fleet === true) {
						var sPath = "/FleetDocumentsSet(Equnr=" + "'" + vechId + "'" + ",DocType=" + "'" + Zftype + "'" + ",DocSeq='')";
					} else {
						var sPath = "/FleetReqDocumentsSet(RequestId=" + "'" + RequestId + "'" + ",DocType=" + "'" + Zftype + "'" + ")";

					}
					oModel.read(sPath, {
						success: function (oData, response) {
							//var oModel3 = new sap.ui.model.json.JSONModel(oData);
							var fMres = oData.Content;
							var fType = oData.Filetype;
							var fName = oData.Filename;
							if (oData.Content === "") {
								sap.m.MessageToast.show("No Data retreived");
								return;
							}
							fMres = "data:" + fType + ";base64," + fMres;

							if (!that.displayContent) {
								that.displayContent = sap.ui.xmlfragment("ZFLEET_DELIVERY_TRUCK_REQ.ZFLEET_DELIVERY_TRUCK_REQ.fragments.filepreview", that);
								that.getView().addDependent(that.displayContent);
							}

							var splitTest = fType.split("/");
							var mimType = splitTest[0];
							var fType = fName.split(".");
							var fileType = fType[1];

							switch (mimType) {
							case 'image':
								sap.ui.getCore().byId("idPdfViewer").setVisible(false);
								sap.ui.getCore().byId("image").setVisible(true);
								sap.ui.getCore().byId("image").setSrc(fMres);
								break;
							default:
								sap.ui.getCore().byId("idPdfViewer").setVisible(true);
								sap.ui.getCore().byId("image").setVisible(false);
								var html = sap.ui.getCore().byId("idPdfViewer");
								html.setContent('<iframe src="' + fMres +
									'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
								break;
							}

							if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
								"xlsx") {
								that.displayContent.open();
								that.fragOpen = true;
							}
							if (that.fragOpen === undefined) {
								window.open(fMres, "_self");
								fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
							}

							//	this.displayContent.open();

						},
						error: function () {

							sap.m.MessageToast.show("No Data retreived");
						}

					});
				}

			},
			handleFile: function (oEvent) {
				//var oFileUploader  = this.getView().byId("idfileUploaderVAT");
				//var oFileSize =  oFileUploader.getSize();
				sap.m.MessageToast.show("File Size exceeds 5 MB Size, Please uploade below 5MB File");
			},
			onPressBarPrintBtn: function (oEvent) {

			},
			onPressBarCloseBtn: function (oEvent) {
				this.displayContent.close();
				this.fragOpen = undefined;
			},
			onValueHelpSearchCust: function (oEvent) {
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter("VechileID", FilterOperator.Contains, sValue);
				//var oFilter2 = new Filter("Name", FilterOperator.Contains, sValue);
				oEvent.getSource().getBinding("items").filter([oFilter]);
			},
			onValueHelpRequestCust: function (oEvent) {
				var sInputValue = oEvent.getSource().getValue(),
					oView1 = this.getView();

				this.inputId1 = oEvent.getSource().getId();

				if (!this._valueHelpDialogCust) {
					this._valueHelpDialogCust = sap.ui.xmlfragment(
						"ZFLEET_DELIVERY_TRUCK_REQ.ZFLEET_DELIVERY_TRUCK_REQ.fragments.ValueHelpDialog",
						this
					);
					this.getView().addDependent(this._valueHelpDialogCust);
				}
				this._valueHelpDialogCust.getBinding("items").filter([new Filter(
					"VechileID",
					sap.ui.model.FilterOperator.Contains, sInputValue
				)]);

				// open value help dialog filtered by the input value
				this._valueHelpDialogCust.open(sInputValue);
			},
			onValueHelpCloseCust: function (oEvent) {

				var oSelectedItem = oEvent.getParameter("selectedItem");
				oEvent.getSource().getBinding("items").filter([]);

				if (!oSelectedItem) {
					return;
				}

				this.byId("idPlateNo").setValue(oSelectedItem.getTitle());
				this.byId("idVechileName").setText(oSelectedItem.getDescription());

				var so = oSelectedItem.getTitle();
				if (so === "") {
					this.getView().byId("idPlateNo").setValueState(sap.ui.core.ValueState.Error);
					//this._wizard.invalidateStep(this.byId("idCustomerDet"));
				} else {
					this.getView().byId("idPlateNo").setValueState(sap.ui.core.ValueState.None);

				}
			},
			onClose: function (oEvent) {
				this._termsCondition.close();
				// this._termsCondition = undefined;

			},
			onTerms: function (oEvent) {
				var result = this.byId("idAccept").getSelected();
				var vechId = this.getView().byId("idPlateNo").getValue();
				if (vechId !== "" && result === true) {
					this.getView().getModel("localModel").setProperty("/SumitRequestVisible", true);

					if (!this._termsCondition) {
						this._termsCondition = sap.ui.xmlfragment(
							"ZFLEET_DELIVERY_TRUCK_REQ.ZFLEET_DELIVERY_TRUCK_REQ.fragments.TermsCondition",
							this
						);
						this.getView().addDependent(this._termsCondition);
					}

					// open value help dialog filtered by the input value
					this._termsCondition.open();
				} else {
					this.getView().getModel("localModel").setProperty("/SumitRequestVisible", false);
				}
			},
			onUploadDocument: function (oEvent, fileId, type, fleet) {
				var oFileUploader = "";
				oFileUploader = this.getView().byId(fileId); //onUploadDocument("idfileCheckList", "CKL");
				var domRef = oFileUploader.getFocusDomRef();
				var file = domRef.files[0];

				debugger;
				if (domRef.files.length !== 0) {
					var that = this;
					this.filenameLicense[type] = file.name;
					this.filetypeLicense[type] = file.type;
					this.getView().byId(fileId).setValueState(sap.ui.core.ValueState.None);
					var reader = new FileReader();

					reader.onload = function (e) {

						//	var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
						//		"");
						var vContent = e.currentTarget.result.replace("data:" + that.filetypeLicense[type] + ";base64,", "");
						//that.postToSap(this.getView().byId("idRequestId").getText(), that.filename, that.filetype, vContent, "SHOPLICENSE");
						var oDataModel = that.getView().getModel();
						var payLoad = {};
						if (fleet === true) {
							payLoad = {
								// "RequestId": RequestId,
								"Equnr": that.vechileId,
								"DocType": type,
								//"Content": btoa(vContent),
								"Content": vContent,
								"Filename": that.filenameLicense[type],
								"Filetype": that.filetypeLicense[type]

							};
							oDataModel.create("/FleetDocumentsSet", payLoad, {
								success: function (oEvent) {
									sap.m.MessageToast.show("Success");
								},
								error: function (oError) {
									sap.m.MessageToast.show("error");
								}
							});
						} else {

							payLoad = {
								"RequestId": RequestId,
								"DocType": type,
								//"Content": btoa(vContent),
								"Content": vContent,
								"Filename": that.filenameLicense[type],
								"Filetype": that.filetypeLicense[type]

							};
							oDataModel.create("/FleetReqDocumentsSet", payLoad, {
								success: function (oEvent) {
									sap.m.MessageToast.show("Success");
								},
								error: function (oError) {
									sap.m.MessageToast.show("error");
								}
							});
						}
					};
					//file reader will start reading
					reader.readAsDataURL(file);
				}
			},
			onSubmitRequest: function (oEvent) {
				//Validation : If no vehicle assigned to the employee than send error message before submitting.
				var vehicle_assigned = this.getView().byId("idVehicleId").getText();
				// if (vehicle_assigned !== "") {
				// 	MessageBox.error("Unable To Submit The Request As , Already Vehicle Is Assigned For the Given Employee ID", {});
				// 	return;
				// }
				var vechId = this.getView().byId("idPlateNo").getValue();
				this.vechileId = vechId;
				var mobileNo = this.getView().byId("idDriverMobile").getValue();
				var id_mobile = this.getView().byId("idDriverMobile");
				if (mobileNo === "" || mobileNo.length < 9) {
					id_mobile.setValueState(ValueState.Error); // or just "Error"
					id_mobile.setValueStateText("Mobile No Is Required");
					return;
				} else {
					id_mobile.setValueState(ValueState.None);
				}
				var pernr = this.getView().byId("idEmpid").getValue();
				var ename_en = this.getView().byId("idNameEn").getText();
				var ename_ar = this.getView().byId("idNameAr").getText();
				var pos_code = this.getView().byId("idPositionCode").getText();
				var pos_en = this.getView().byId("idPositionEn").getText();
				var pos_ar = this.getView().byId("idPositionAr").getText();
				var dept_en = this.getView().byId("idDepartmentEn").getText();
				var dept_ar = this.getView().byId("idDepartmentAr").getText();
				var channel = this.getView().byId("idChannel").getText();
				var cocd = this.getView().byId("idCocd").getText();
				var cocd_name = this.getView().byId("idCompanyName").getText();
				var eplant = this.getView().byId("idEmpPlant").getText();
				var emp_subgrp = this.getView().byId("idEmpSubGroup").getText();
				var subgroup_desc = this.getView().byId("idEmpSubGroupDesc").getText();
				var iquama = this.getView().byId("idIquama").getText();
				var dl = this.getView().byId("idDl").getValue();
				DLDate = new Date(this.getView().byId("idD2").getValue());

				MOTDate = new Date(this.getView().byId("idD3").getValue());
				var emp_cc = this.getView().byId("idEmpCostCenter").getText();
				var dl_id = this.getView().byId("idDl");
				var dl_ex_date_id = this.getView().byId("idD2");
				var dl_mot_date_id = this.getView().byId("idD3");
				if (this.getView().byId("idD2").getValue() === "") {
					dl_ex_date_id.setValueState(ValueState.Error); // or just "Error"
					dl_ex_date_id.setValueStateText("Driving license Expiry Is Required");
					return;
				} else {
					dl_ex_date_id.setValueState(ValueState.None);
				}
				if (this.getView().byId("idD3").getValue() === "") {
					dl_ex_date_id.setValueState(ValueState.Error); // or just "Error"
					dl_ex_date_id.setValueStateText("Drivings Card Is Required");
					return;
				} else {
					dl_ex_date_id.setValueState(ValueState.None);
				}
				if (MOTDate === "") {
					dl_mot_date_id.setValueState(ValueState.Error); // or just "Error"
					dl_mot_date_id.setValueStateText("Driving license Is Required");
					return;
				} else {
					dl_ex_date_id.setValueState(ValueState.None);
				}
				var oModel = this.getView().getModel();
				var that = this;
				var flag = "";
				var fleet_req_entry = {
					Pernr: pernr,
					NameEn: ename_en,
					NameAr: ename_ar,
					PositionId: pos_code,
					PositionTextEn: pos_en,
					PositionTextAr: pos_ar,
					NatioEn: "",
					NatioAr: "",
					DepartmentEn: dept_en,
					DepartmentAr: dept_ar,
					IdNoEn: iquama,
					IdNoAr: "",
					Cocd: cocd,
					CocdDesc: cocd_name,
					CostCenter: emp_cc,
					Dl: dl,
					EmpSubgroup: emp_subgrp,
					EmpSubgroupDesc: subgroup_desc,
					Channel: channel,
					Plant: eplant,
					DLExpDate: DLDate,
					MOTExpDate: MOTDate,
					VechileAssigned: vechId,
					MobileNo: mobileNo,
					RequestHeaderToItemNav: [{}]
				};

				oModel.create("/FleetRequestHeaderSet",
					fleet_req_entry, {
						success: function (oData, response) {
							if (oData.Requestduplicate === 'X') {
								MessageBox.error("Duplicate Request being submitted.", {});
								flag = 'X';
							}

							if (oData.Requesterror === 'X') {
								MessageBox.error("Error while submitting request. Please Try again.", {});
								flag = 'X';
							}

							if (flag !== 'X') {
								that.oLocalModel2.setProperty("/Response", oData);
								that.oLocalModel2.setProperty("/Type", "Success");
								that.oLocalModel2.setProperty("/Visible", true);
								RequestId = that.oLocalModel2.getProperty("/Response/RequestId");
								var Text = "Delivery Truck Request :" + RequestId + " has been generated successfully";
								// MessageBox.success(Text, { });
								that.oLocalModel2.setProperty("/Text", Text);

								that.getView().getModel("localModel").setProperty("/SumitRequestVisible", false);
								that.getView().getModel("localModel").setProperty("/idAccept", false);
								that.getView().getModel("localModel").setProperty("/idD3", false);
								that.getView().getModel("localModel").setProperty("/idD2", false);
								that.getView().getModel("localModel").setProperty("/idfileCheckList", false);
								that.getView().getModel("localModel").setProperty("/idfileDL", false);
								that.getView().getModel("localModel").setProperty("/idfileMOT", false);
								that.getView().getModel("localModel").setProperty("/idFrontUpload", false);
								that.getView().getModel("localModel").setProperty("/idLeftUpload", false);
								that.getView().getModel("localModel").setProperty("/idRightUpload", false);
								that.getView().getModel("localModel").setProperty("/idBackUpload", false);

								//Check List
								that.onUploadDocument(oEvent, "idfileCheckList", "CKL", false);
								that.onUploadDocument(oEvent, "idfileDL", "DL", false);
								that.onUploadDocument(oEvent, "idfileMOT", "MOTD", false);
								that.onUploadDocument(oEvent, "idFrontUpload", "FIM", true);
								that.onUploadDocument(oEvent, "idLeftUpload", "LIM", true);
								that.onUploadDocument(oEvent, "idRightUpload", "RIM", true);
								that.onUploadDocument(oEvent, "idBackUpload", "BIM", true);

							}
						},
						error: function (oError) {
							var error_msg = jQuery.parseJSON(oError.responseText).error.message.value;
							MessageBox.error(error_msg, {});
							return;
						}
					});
			}
		});
	});