sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/ui/core/library",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, Export, ExportTypeCSV, CoreLibrary, msg) {
	"use strict";
	var localJSON = new JSONModel();
	var ValueState = CoreLibrary.ValueState;
	var g;
	var cdata;
	var r = {
		catList: []
	};
	var p1 = {
		pList: []
	};
	var n = {
		newList: []
	};
	var z = {
		zList: []
	};
	var carr = {
		carrList: []
	};

	return Controller.extend("com.qb2i4.qb2i4.controller.View1", {

		onInit: function () {
			sap.ui.getCore().getConfiguration().setLanguage("en");

			sap.ui.getCore().attachLocalizationChanged(function (oEvent) {
				var oChanges = oEvent.getParameter("changes");
				if (oChanges && oChanges.language) {
					this._bundle = sap.ui.getCore().getLibraryResourceBundle("sap.m", oChanges.language);
					this.rerender();
				}
			}.bind(this));

			var that = this;
			sap.ui.core.BusyIndicator.show();
			var u = new sap.ui.model.json.JSONModel();
			var R = "/OPENSAP/sap/opu/odata/sap/YY1_PLANT_API_CDS/";
			var x1 = new sap.ui.model.odata.ODataModel(R, true);
			// var y = "SupplyDemandItems" + "?$filter=(MRPPlant eq " + n + "and Material eq " + n1 + ")";
			var y = "YY1_Plant_API";

			x1.read(y, {
				async: false,
				success: function (oData, response) {

					//	localJSON2.setData(oData);
					var data = oData.results;
					cdata = data.length;
					var i = data.length;

					for (var a = 0; a < i; a++) {
						g = a;
						p1.pList.push({
							Plant: data[a].Plant

						});
						if (cdata === g + 1 && cdata !== undefined && g !== undefined) {
							that.abcd();
						}

					}

					sap.ui.core.BusyIndicator.hide();

				},
				error: function (oError) {
					//sap.ui.core.BusyIndicator.hide(); 
					////this._onBatchError();
					//jQuery.sap.require("sap.m.MessageBox");
					//sap.m.MessageBox.show((JSON.parse(oError.response.body).error.message.value));
				}

			});

			//	sap.ui.core.BusyIndicator.hide(); 

		},

		abcd: function () {
			for (var t = 0; t < p1.pList.length; t++) {
				carr.carrList[t] = p1.pList[t].Plant;
			}
			var carrfilter = carr.carrList.filter(function (item, index, inputArray) {
				return inputArray.indexOf(item) === index;
			});
			this.h = carrfilter;
			var p = {
				pList: []
			};
			for (var f = 0; f < carrfilter.length; f++) {
				p.pList.push({
					Plant: carrfilter[f]

				});
			}
			var ocModel = new sap.ui.model.json.JSONModel();
			ocModel.setData(p);
			this.getView().setModel(ocModel);
			this.getView().byId("mb").setValue(null);
		},
		handleChange: function (oEvent) {

			r.catList.splice(0, r.catList.length);
			n.newList.splice(0, n.newList.length);
			z.zList.splice(0, z.zList.length);
			// j.jList.splice(0, j.jList.length);
			var empty = new sap.ui.model.json.JSONModel();
			this.getView().setModel(empty, "MRP");

			var sFrom = oEvent.getParameter("from"),
				// sFrom.setDate(sFrom.getDate() + 1);
				// sFromsetDate
				sTo = oEvent.getParameter("to");
			var Ofilter1 = new Filter({
				path: "CreationDate",
				operator: FilterOperator.BT,
				value1: sFrom,
				value2: sTo
			});

			sap.ui.core.BusyIndicator.show();
			var oModelA = this.getView().getModel("modA");
			// var that = this;
			oModelA.read("/YY1_Pur_req_MRP", {
				filters: [Ofilter1],
				async: false,
				success: function (oData, response) {

					//	localJSON2.setData(oData);
					var data = oData.results;
					cdata = data.length;
					var i = data.length;

					for (var a = 0; a < i; a++) {
						g = a;

						if (a !== 0) {
							var b = a - 1;
						} else {
							b = 0;
							r.catList.push({

								PurchaseRequisition: data[a].PurchaseRequisition,
								PurchaseRequisitionItem: data[a].PurchaseRequisitionItem,
								Plant: data[a].Plant,
								Material: data[a].Material,
								DeliveryDate: data[a].DeliveryDate,
								RequestedDeliveryDate: data[a].RequestedDeliveryDate,
								CreationDate: data[a].CreationDate,
								AccountAssignmentCategory: data[a].AccountAssignmentCategory,
								FixedSupplier: data[a].FixedSupplier,
								OrganizationBPName1: data[a].OrganizationBPName1,
								ProductDescription: data[a].ProductDescription,
								ZZITEM: data[a].ZZITEM

							});
						}
						if (data[a].PurchaseRequisition !== data[b].PurchaseRequisition || data[a].PurchaseRequisitionItem !== data[b].PurchaseRequisitionItem) {
							r.catList.push({

								PurchaseRequisition: data[a].PurchaseRequisition,
								PurchaseRequisitionItem: data[a].PurchaseRequisitionItem,
								Plant: data[a].Plant,
								Material: data[a].Material,
								DeliveryDate: data[a].DeliveryDate,
								RequestedDeliveryDate: data[a].RequestedDeliveryDate,
								CreationDate: data[a].CreationDate,
								AccountAssignmentCategory: data[a].AccountAssignmentCategory,
								FixedSupplier: data[a].FixedSupplier,
								OrganizationBPName1: data[a].OrganizationBPName1,
								ProductDescription: data[a].ProductDescription,
								ZZITEM: data[a].ZZITEM

							});
						}
						// if (cdata === g + 1 && cdata !== undefined && g !== undefined) {
						// 	that.abcd();
						// }
						// }
					}

					sap.ui.core.BusyIndicator.hide();

				},
				error: function (oError) {
					//sap.ui.core.BusyIndicator.hide(); 
					////this._onBatchError();
					//jQuery.sap.require("sap.m.MessageBox");
					//sap.m.MessageBox.show((JSON.parse(oError.response.body).error.message.value));
				}

			});

			// debugger:

			this.bValid = oEvent.getParameter("valid");
			sFrom = JSON.stringify(sFrom);
			this.from = sFrom.slice(1, 11);
			// this.from. = this.from + 1;
			sTo = JSON.stringify(sTo);
			this.to = sTo.slice(1, 11);
			// debugger;
			this.getView().byId("mb").setValue(null);
			// this.pman = false;
			//	oEventSource = oEvent.getSource();

		},
		funcA: function (oEvent) {

			var that = this;
			n.newList.splice(0, n.newList.length);
			z.zList.splice(0, z.zList.length);
			// j.jList.splice(0, j.jList.length);
			var empty = new sap.ui.model.json.JSONModel();
			this.getView().setModel(empty, "MRP");
			//	this.pman = true;
			if (this.from === undefined || this.to === undefined) {
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.show(
					"Please Select Date Range", {
						icon: sap.m.MessageBox.Icon.WARNING,
						title: "Dear User",
						actions: [sap.m.MessageBox.Action.YES],
						onClose: function (oAction) {
							if (oAction === "YES") {
								that.getView().byId("mb").setValue(null);
								return;
							}

						}
					}
				);
			} else {
				sap.ui.core.BusyIndicator.show();
				var oModelB = this.getView().getModel("modB");
				var plant = oEvent.getParameter("value");
				this.pcheck = plant;

				var arr = new Array();
				for (var a = 0; a < r.catList.length; a++) {
					var check = JSON.stringify(r.catList[a].CreationDate);
					check = check.slice(1, 11);
					if (r.catList[a].Plant === plant) {
						n.newList.push({
							PurchaseRequisition: r.catList[a].PurchaseRequisition,
							PurchaseRequisitionItem: r.catList[a].PurchaseRequisitionItem,
							Plant: r.catList[a].Plant,
							Material: r.catList[a].Material,
							DeliveryDate: r.catList[a].DeliveryDate,
							RequestedDeliveryDate: r.catList[a].RequestedDeliveryDate,
							AccountAssignmentCategory: r.catList[a].AccountAssignmentCategory,
							FixedSupplier: r.catList[a].FixedSupplier,
							OrganizationBPName1: r.catList[a].OrganizationBPName1,
							ProductDescription: r.catList[a].ProductDescription,
							ZZITEM: r.catList[a].ZZITEM
						});
					}
				}
				if (n.newList.length === 0 || n.newList.length === undefined) {
					sap.ui.core.BusyIndicator.hide();
					//sap.m.MessageToast.show("No Records Found for date" + this.from + "to" + this.to);
					//return;
					var blank = new sap.ui.model.json.JSONModel(); //added to remove data from table 
					this.getView().setModel(blank, "MRP"); //added to remove data from table 
					that = this;
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.show(
						"No Records Found for date " + this.from + " to " + this.to, {
							icon: sap.m.MessageBox.Icon.ERROR,
							title: "Dear User",
							actions: [sap.m.MessageBox.Action.YES],
							onClose: function (oAction) {
								if (oAction === "YES") {
									that.getView().byId("mb").setValue(null);
									return;
								}

							}
						}
					);
				} else {
					for (var b = 0; b < n.newList.length; b++) {
						if (n.newList[b].AccountAssignmentCategory !== "Y") {
							arr[b] = n.newList[b].Material;
						}

					}
					var arrfilter = arr.filter(function (item, index, inputArray) {
						return inputArray.indexOf(item) === index;
					});
					// ----------------------------------------new approach------------------------------------------------------//
					var oPlant = new sap.ui.model.Filter("MRPPlant", sap.ui.model.FilterOperator.EQ, plant);
					var oPlantFilter = new sap.ui.model.Filter({
						filters: [oPlant],
						and: true
					});
					var aMatFilter = [];
					for (var q = 0; q < arrfilter.length; q++) {

						aMatFilter.push(new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.EQ, arrfilter[q]));
					}
					var oFilter = new sap.ui.model.Filter({
						filters: aMatFilter,
						and: false
					});

					var oDataFilter = new Array(new sap.ui.model.Filter({
						filters: [oPlantFilter, oFilter],
						and: true
					})); //ADDING AND TO ALL FILTERS

					oModelB.read("/SupplyDemandItems", {
						async: false,
						filters: [oDataFilter],
						success: function (oData, response) {

							var data2 = oData.results;
							var i = data2.length;
							for (var c = 0; c < i; c++) {
								z.zList.push({
									MRPElementCategoryName: data2[c].MRPElementCategoryName,
									MRPArea: data2[c].MRPArea,
									MRPController: data2[c].MRPController,
									SourceMRPElementItem: data2[c].SourceMRPElementItem,
									SourceMRPElement: data2[c].SourceMRPElement,
									Material: data2[c].Material,
									MRPPlant: data2[c].MRPPlant,
									MRPElementAvailyOrRqmtDate: data2[c].MRPElementAvailyOrRqmtDate,
									ExceptionMessageText: data2[c].ExceptionMessageText
								});
								sap.ui.core.BusyIndicator.hide();
							}
						},
						error: function (oError) {
							sap.ui.core.BusyIndicator.hide();

							//alert("failed");
						}

					});
					// ----------------------------------------new approach------------------------------------------------------//

					// ------------------------------------Old Approach--------------------------------------------------------//
					//           	for (var o = 0; o < arrfilter.length; o++) {  //1000 //arrfilter.length

					//           	var Mat = arrfilter[o];
					// var myFilter2 =   new Filter({
					//                                  filters: [
					//                  new Filter("MRPPlant", FilterOperator.EQ, plant),
					//                  new Filter("Material", FilterOperator.EQ, Mat)
					// 			],
					//   and: true
					// }); 	

					// 				oModelB.read("/SupplyDemandItems",{async:false , filters:[myFilter2], success : function(oData, response){

					// 		var data2 = oData.results;
					//           			 var i = data2.length;
					//           				for (var c = 0; c < i; c++) {
					// 				z.zList.push({
					// 												MRPElementCategoryName: data2[c].MRPElementCategoryName,
					// 												SourceMRPElementItem: data2[c].SourceMRPElementItem,
					// 												SourceMRPElement:data2[c].SourceMRPElement,
					// 												Material:data2[c].Material,
					// 												MRPPlant:data2[c].MRPPlant,
					// 												MRPElementAvailyOrRqmtDate:data2[c].MRPElementAvailyOrRqmtDate,
					// 												ExceptionMessageText:data2[c].ExceptionMessageText
					// 				});
					//           					sap.ui.core.BusyIndicator.hide(); 	
					//           				}
					// },error:function(oError){
					// sap.ui.core.BusyIndicator.hide(); 

					// }

					// });

					//           				}
					// ------------------------------------Old Approach--------------------------------------------------------//
				}
			}
		},
		onShow: function (oEvent) {

			var pcheck = this.getView().byId("mb").getValue();
			if (this.bValid === undefined || this.bValid === false || pcheck === undefined || pcheck === "") {
				sap.m.MessageToast.show("Please select valid Details");
				return;
			} else {
				var e = "Fetching Report data ...  ";
				msg.show(e);
				sap.ui.core.BusyIndicator.show();

				// -----------------------------------------------------------------------------------
				var xarr = new Array();
				var warr = new Array();
				var larr = new Array();
				var oButton = this.getView().byId("btnId");
				// oButton.setBusy(true);
				// oButton.setBusyIndicatorDelay(0);

				// for (var q = 0; q < n.newList.length; q++) {
				// 	xarr[q] = n.newList[q].PurchaseRequisition;
				// 	warr[q] = n.newList[q].PurchaseRequisitionItem;
				// }
				// var xarrfilter = xarr.filter(function (item, index, inputArray) {
				// 	return inputArray.indexOf(item) === index;
				// });
				// var warrfilter = warr.filter(function (item, index, inputArray) {
				// 	return inputArray.indexOf(item) === index;
				// });
				// for (var k = 0; k < warrfilter.length; k++) {
				// 	larr[k] = parseInt(warrfilter[k], 10);
				// }
				// larr = larr.map(String);
				var y = {
					yList: []
				};
				var j = {
					jList: []
				};
				var final = {
					finalList: []
				};
				var flag = " ";
				// sap.ui.core.BusyIndicator.show();oButton.setBusy(true);oButton.setBusy(true);
				// oButton.setBusy(true);
				// for (var t = 0; t < xarrfilter.length; t++) {n.newList
				for (var t = 0; t < n.newList.length; t++) {
					flag = " ";
					if (n.newList[t].DeliveryDate === null) {
						var date3;
					} else {
						date3 = JSON.stringify(n.newList[t].DeliveryDate);
						date3 = date3.slice(1, 11);
					}

					if (n.newList[t].RequestedDeliveryDate === null) {
						var date4;
					} else {
						date4 = JSON.stringify(n.newList[t].RequestedDeliveryDate);
						date4 = date4.slice(1, 11);
					}
					// n.newList[q].PurchaseRequisitionItem = parseInt(n.newList[q].PurchaseRequisitionItem, 10);
					for (var s = 0; s < z.zList.length; s++) {

						if (n.newList[t].PurchaseRequisition === z.zList[s].SourceMRPElement && z.zList[s].MRPElementCategoryName ===
							"Purchase requisition" && n.newList[t].ZZITEM === z.zList[s].SourceMRPElementItem) {
							flag = "X";
							final.finalList.push({
								MRPElementCategoryName: z.zList[s].MRPElementCategoryName,
								SourceMRPElementItem: z.zList[s].SourceMRPElementItem,
								MRPArea: z.zList[s].MRPArea,
								SourceMRPElement: z.zList[s].SourceMRPElement,
								Material: z.zList[s].Material,
								MRPController: z.zList[s].MRPController,
								MRPPlant: z.zList[s].MRPPlant,
								MRPElementAvailyOrRqmtDate: z.zList[s].MRPElementAvailyOrRqmtDate,
								ExceptionMessageText: z.zList[s].ExceptionMessageText,
								FixedSupplier: n.newList[t].FixedSupplier,
								OrganizationBPName1: n.newList[t].OrganizationBPName1,
								ProductDescription: n.newList[t].ProductDescription,
								DeliveryDate: date3,
								RequestedDeliveryDate: date4
							});

						}

					}
					if (flag !== "X") {
						final.finalList.push({
							SourceMRPElement: n.newList[t].PurchaseRequisition,
							SourceMRPElementItem: n.newList[t].ZZITEM,
							Material: n.newList[t].Material,
							MRPPlant: n.newList[t].Plant,
							FixedSupplier: n.newList[t].FixedSupplier,
							OrganizationBPName1: n.newList[t].OrganizationBPName1,
							ProductDescription: n.newList[t].ProductDescription,
							DeliveryDate: date3,
							RequestedDeliveryDate: date4
						});
						flag = " ";
					}
				}
			}
			// sap.ui.core.BusyIndicator.show();

			// oButton.setBusy(false);
			if (final.finalList.length <= 0 || final.finalList.length === undefined) {
				sap.m.MessageToast.show("No Records Found");
				var empty = new sap.ui.model.json.JSONModel();
				this.getView().setModel(empty, "MRP");
			} else {
				localJSON.setData(final);
				localJSON.setSizeLimit(1000000);
				this.getView().setModel(localJSON, "MRP");

			}
			sap.ui.core.BusyIndicator.hide();
			// --------------------------------------------------------------------------------------
			// 		var y = {
			// 			yList: []
			// 		};
			// 	if (n.newList.length >= z.zList.length){
			// 		for (var d = 0; d < z.zList.length; d++ ){
			// 			if(z.zList[d].MRPElementCategoryName === "Purchase requisition" ){
			// 	                   	y.yList.push({
			// 														PurchaseRequisition: n.newList[d].PurchaseRequisition,
			// 														PurchaseRequisitionItem: n.newList[d].PurchaseRequisitionItem,
			// 														MRPElementAvailyOrRqmtDate:z.zList[d].MRPElementAvailyOrRqmtDate,
			// 														Material:z.zList[d].Material,
			// 														MRPPlant:z.zList[d].MRPPlant
			// 						});			
			// 			}
			// 		}
			// 	}
			// 	else if(n.newList.length < z.zList.length ){
			// 			for (var e = 0; e < n.newList.length; e++ ){
			// 			if(z.zList[e].MRPElementCategoryName === "Purchase requisition"){
			// 	                   	y.yList.push({
			// 														PurchaseRequisition: n.newList[e].PurchaseRequisition,
			// 														PurchaseRequisitionItem: n.newList[e].PurchaseRequisitionItem,
			// 														MRPElementAvailyOrRqmtDate:z.zList[e].MRPElementAvailyOrRqmtDate,
			// 														Material:z.zList[e].Material,
			// 														MRPPlant:z.zList[e].MRPPlant
			// 						});			
			// 			}
			// 		}
			// 	}
			// 	if (y.yList.length <= 0 || y.yList.length === undefined){
			// 			sap.m.MessageToast.show("No Records Found");                               
			// 	}
			// 	else {
			// 	localJSON.setData(y);
			// 	localJSON.setSizeLimit(10000);
			// //	localJSON2.updateBindings(true);   //was commented

			//        	this.getView().setModel(localJSON, "MRP");
			// 		n.newList.splice(0,n.newList.length);
			// 		z.zList.splice(0,z.zList.length);
			// 		y.yList.splice(0,y.yList.length);

			// 	}
		},
		// },
		onReset: function (e) {
			var space = " ";
			this.getView().byId("mb").setValue(space);
			this.getView().byId("DRS3").setValue(space);
		},
		onClear: function (e) {
			var space = " ";
			this.getView().byId("mb").setValue(space);
			this.getView().byId("DRS3").setValue(space);

		},
		onOpen: function () {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var url = oResourceBundle.getText("https://my301187.s4hana.ondemand.com/ui#PurchaseRequisition-manage?source=lpd").toString().trim();
			window.open(url, "_blank");
		},
		onDataExport: function () {
			var oModel = this.getView().getModel("MRP");
			var oExport = new Export({
				exportType: new ExportTypeCSV({
					// for xls....
					//fileExtension: "xls",
					//separatorChar: "\t",
					//charset: "utf-8",
					//mimeType: "application/vnd.ms-excel"

					// for CSV....
					charset: "utf-8",
					fileExtension: "csv",
					separatorChar: ",",
					mimeType: "application/csv"
				}),
				models: oModel,

				rows: {
					path: "/finalList"
				},
				columns: [{
						name: "Purchase Requisition",
						template: {
							content: "{SourceMRPElement}"
						}
					}, {
						name: "Item",
						template: {
							content: "{SourceMRPElementItem}"
						}
					}, {
						name: "Plant",
						template: {
							content: "{MRPPlant}"
						}
					},

					{
						name: "MRP Area",
						template: {
							content: "{MRPArea}"
						}
					}, {
						name: "MRP Controller",
						template: {
							content: "{MRPController}"
						}
					}, {
						name: "Material",
						template: {
							content: "{Material}"
						}
					}, {
						name: "Material Description",
						template: {
							content: "{ProductDescription}"
						}
					},

					{
						name: "Supplier",
						template: {
							content: "{FixedSupplier}"
						}
					}, {
						name: "Supplier Name",
						template: {
							content: "{OrganizationBPName1}"
						}
					},

					{
						name: "Delivery Date",
						template: {
							content: "{DeliveryDate}"
						}
					}, {
						name: "Actual need date",
						template: {
							content: "{ExceptionMessageText}"
						}
					}, {
						name: "Requested Delivery Date",
						template: {
							content: "{RequestedDeliveryDate}"
						}
					}

				]
			});
			oExport.saveFile().catch(function (oError) {
				sap.m.MessageToast.show("Error");
			}).then(function () {
				oExport.destroy();
			});
		}
	});
});