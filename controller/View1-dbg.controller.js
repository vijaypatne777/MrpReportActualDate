sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/ui/core/library"
], function (Controller, JSONModel, Filter, FilterOperator, Export, ExportTypeCSV, CoreLibrary) {
	"use strict";
	var localJSON = new JSONModel();
	var ValueState = CoreLibrary.ValueState;
	var g;
	var cdata;
	var r = {
		catList: []
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
			sap.ui.core.BusyIndicator.show(10);
			var oModelA = this.getView().getModel("modA");
			var that = this;
			oModelA.read("/YY1_Pur_req_MRP", {
				async: false,
				success: function (oData, response) {

					//	localJSON2.setData(oData);
					var data = oData.results;
					cdata = data.length;
					var i = data.length;

					for (var a = 0; a < i; a++) {
						g = a;
						r.catList.push({
							PurchaseRequisition: data[a].PurchaseRequisition,
							PurchaseRequisitionItem: data[a].PurchaseRequisitionItem,
							Plant: data[a].Plant,
							Material: data[a].Material,
							DeliveryDate: data[a].DeliveryDate,
							RequestedDeliveryDate: data[a].RequestedDeliveryDate,
							CreationDate: data[a].CreationDate,
							AccountAssignmentCategory: data[a].AccountAssignmentCategory

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
			for (var t = 0; t < r.catList.length; t++) {
				carr.carrList[t] = r.catList[t].Plant;
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
		},
		handleChange: function (oEvent) {
			var sFrom = oEvent.getParameter("from"),
				sTo = oEvent.getParameter("to");
			this.bValid = oEvent.getParameter("valid");
			sFrom = JSON.stringify(sFrom);
			this.from = sFrom.slice(1, 11);
			sTo = JSON.stringify(sTo);
			this.to = sTo.slice(1, 11);
			this.getView().byId("mb").setValue(null);
			// this.pman = false;
			//	oEventSource = oEvent.getSource();

		},
		funcA: function (oEvent) {
			var that = this;
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
					if (r.catList[a].Plant === plant && check <= this.to && check >= this.from) {
						n.newList.push({
							PurchaseRequisition: r.catList[a].PurchaseRequisition,
							PurchaseRequisitionItem: r.catList[a].PurchaseRequisitionItem,
							Plant: r.catList[a].Plant,
							Material: r.catList[a].Material,
							DeliveryDate: r.catList[a].DeliveryDate,
							RequestedDeliveryDate: r.catList[a].RequestedDeliveryDate,
							AccountAssignmentCategory: r.catList[a].AccountAssignmentCategory
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
		onShow: function () {
			var pcheck = this.getView().byId("mb").getValue();

			if (this.bValid === undefined || this.bValid === false || pcheck === undefined || pcheck === "") {
				sap.m.MessageToast.show("Please select valid Details");
				return;
			} else {
				// -----------------------------------------------------------------------------------
				var xarr = new Array();
				var warr = new Array();
				var larr = new Array();
				var oButton = this.getView().byId("btnId");
				oButton.setBusy(true);
				oButton.setBusyIndicatorDelay(0);

				for (var q = 0; q < n.newList.length; q++) {
					xarr[q] = n.newList[q].PurchaseRequisition;
					warr[q] = n.newList[q].PurchaseRequisitionItem;
				}
				var xarrfilter = xarr.filter(function (item, index, inputArray) {
					return inputArray.indexOf(item) === index;
				});
				var warrfilter = warr.filter(function (item, index, inputArray) {
					return inputArray.indexOf(item) === index;
				});
				for (var k = 0; k < warrfilter.length; k++) {
					larr[k] = parseInt(warrfilter[k], 10);
				}
				larr = larr.map(String);
				var y = {
					yList: []
				};
				var j = {
					jList: []
				};
				// sap.ui.core.BusyIndicator.show();oButton.setBusy(true);oButton.setBusy(true);
				oButton.setBusy(true);
				for (var t = 0; t < xarrfilter.length; t++) {
					for (var s = 0; s < z.zList.length; s++) {
						if (xarrfilter[t] === z.zList[s].SourceMRPElement && z.zList[s].MRPElementCategoryName === "Purchase requisition") {
							y.yList.push({
								MRPElementCategoryName: z.zList[s].MRPElementCategoryName,
								SourceMRPElementItem: z.zList[s].SourceMRPElementItem,
								SourceMRPElement: z.zList[s].SourceMRPElement,
								Material: z.zList[s].Material,
								MRPPlant: z.zList[s].MRPPlant,
								MRPElementAvailyOrRqmtDate: z.zList[s].MRPElementAvailyOrRqmtDate,
								ExceptionMessageText: z.zList[s].ExceptionMessageText
							});
						}
					}
					// sap.ui.core.BusyIndicator.show();
				}
				for (var m = 0; m < larr.length; m++) {
					for (var p = 0; p < y.yList.length; p++) {
						if (larr[m] === y.yList[p].SourceMRPElementItem) {
							j.jList.push({
								MRPElementCategoryName: y.yList[p].MRPElementCategoryName,
								SourceMRPElementItem: y.yList[p].SourceMRPElementItem,
								SourceMRPElement: y.yList[p].SourceMRPElement,
								MRPElementAvailyOrRqmtDate: y.yList[p].MRPElementAvailyOrRqmtDate,
								Material: y.yList[p].Material,
								MRPPlant: y.yList[p].MRPPlant,
								ExceptionMessageText: y.yList[p].ExceptionMessageText
							});
						}
					}
				}
				var final = {
					finalList: []
				};
				//	final.finalList = j.jList;
				for (var v = 0; v < j.jList.length; v++) {
					for (var vu = 0; vu < n.newList.length; vu++) {
						if (j.jList[v].SourceMRPElement === n.newList[vu].PurchaseRequisition) {
							var date1 = JSON.stringify(j.jList[v].MRPElementAvailyOrRqmtDate);
							date1 = date1.slice(1, 11);
							var date2 = JSON.stringify(n.newList[vu].DeliveryDate);
							date2 = date2.slice(1, 11);
							if (n.newList[vu].RequestedDeliveryDate === null) {
								var date3;
							} else {
								date3 = JSON.stringify(n.newList[vu].RequestedDeliveryDate);
								date3 = date3.slice(1, 11);
							}

							final.finalList.push({
								DeliveryDate: date2,
								MRPElementCategoryName: j.jList[v].MRPElementCategoryName,
								SourceMRPElementItem: j.jList[v].SourceMRPElementItem,
								SourceMRPElement: j.jList[v].SourceMRPElement,
								MRPElementAvailyOrRqmtDate: date1,
								Material: j.jList[v].Material,
								MRPPlant: j.jList[v].MRPPlant,
								RequestedDeliveryDate: date3,
								ExceptionMessageText: j.jList[v].ExceptionMessageText
							});

						}
						if (j.jList[v].SourceMRPElement === n.newList[vu].PurchaseRequisition) {
							break;
						}
					}

				}
				// sap.ui.core.BusyIndicator.hide();
				oButton.setBusy(false);
				if (j.jList.length <= 0 || j.jList.length === undefined) {
					sap.m.MessageToast.show("No Records Found");
					var empty = new sap.ui.model.json.JSONModel();
					this.getView().setModel(empty, "MRP");
				} else {
					localJSON.setData(final);
					localJSON.setSizeLimit(1000000);
					this.getView().setModel(localJSON, "MRP");
					n.newList.splice(0, n.newList.length);
					z.zList.splice(0, z.zList.length);
					j.jList.splice(0, j.jList.length);

				}
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
			}
		},
		onReset: function (e) {
			var space = " ";
			this.getView().byId("Plant").setValue(space);
			this.getView().byId("DRS3").setValue(space);
		},
		onClear: function (e) {
			var space = " ";
			this.getView().byId("Plant").setValue(space);
			this.getView().byId("DRS3").setValue(space);

		},
		onOpen: function () {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var url = oResourceBundle.getText("Login").toString().trim();
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
					name: "PR",
					template: {
						content: "{SourceMRPElement}"
					}
				}, {
					name: "PR Item",
					template: {
						content: "{SourceMRPElementItem}"
					}
				}, {
					name: "Plant",
					template: {
						content: "{MRPPlant}"
					}
				}, {
					name: "Material",
					template: {
						content: "{Material}"
					}
				}, {
					name: "Actual need date",
					template: {
						content: "{MRPElementAvailyOrRqmtDate}"
					}
				}, {
					name: "Requested Delivery Date",
					template: {
						content: "{RequestedDeliveryDate}"
					}
				}, {
					name: "Delivery Date",
					template: {
						content: "{DeliveryDate}"
					}
				}]
			});
			oExport.saveFile().catch(function (oError) {
				sap.m.MessageToast.show("Error");
			}).then(function () {
				oExport.destroy();
			});
		}
	});
});