sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter", "sap/ui/model/FilterOperator",
	"sap/ui/core/util/Export", "sap/ui/core/util/ExportTypeCSV", "sap/ui/core/library", "sap/m/MessageToast"
], function (e, t, i, a, s, n, r, o) {
	"use strict";
	var l = new t;
	var u = r.ValueState;
	var c;
	var d;
	var m = {
		catList: []
	};
	var p = {
		pList: []
	};
	var P = {
		newList: []
	};
	var g = {
		zList: []
	};
	var h = {
		carrList: []
	};
	return e.extend("com.qb2i4.qb2i4.controller.View1", {
		onInit: function () {
			sap.ui.getCore().getConfiguration().setLanguage("en");
			sap.ui.getCore().attachLocalizationChanged(function (e) {
				var t = e.getParameter("changes");
				if (t && t.language) {
					this._bundle = sap.ui.getCore().getLibraryResourceBundle("sap.m", t.language);
					this.rerender()
				}
			}.bind(this));
			var e = this;
			sap.ui.core.BusyIndicator.show();
			var t = new sap.ui.model.json.JSONModel;
			var i = "/OPENSAP/sap/opu/odata/sap/YY1_PLANT_API_CDS/";
			var a = new sap.ui.model.odata.ODataModel(i, true);
			var s = "YY1_Plant_API";
			a.read(s, {
				async: false,
				success: function (t, i) {
					var a = t.results;
					d = a.length;
					var s = a.length;
					for (var n = 0; n < s; n++) {
						c = n;
						p.pList.push({
							Plant: a[n].Plant
						});
						if (d === c + 1 && d !== undefined && c !== undefined) {
							e.abcd()
						}
					}
					sap.ui.core.BusyIndicator.hide()
				},
				error: function (e) {}
			})
		},
		abcd: function () {
			for (var e = 0; e < p.pList.length; e++) {
				h.carrList[e] = p.pList[e].Plant
			}
			var t = h.carrList.filter(function (e, t, i) {
				return i.indexOf(e) === t
			});
			this.h = t;
			var i = {
				pList: []
			};
			for (var a = 0; a < t.length; a++) {
				i.pList.push({
					Plant: t[a]
				})
			}
			var s = new sap.ui.model.json.JSONModel;
			s.setData(i);
			this.getView().setModel(s);
			this.getView().byId("mb").setValue(null)
		},
		handleChange: function (e) {
			m.catList.splice(0, m.catList.length);
			P.newList.splice(0, P.newList.length);
			g.zList.splice(0, g.zList.length);
			var t = new sap.ui.model.json.JSONModel;
			this.getView().setModel(t, "MRP");
			var s = e.getParameter("from"),
				n = e.getParameter("to");
			var r = new i({
				path: "CreationDate",
				operator: a.BT,
				value1: s,
				value2: n
			});
			sap.ui.core.BusyIndicator.show();
			var o = this.getView().getModel("modA");
			o.read("/YY1_Pur_req_MRP", {
				filters: [r],
				async: false,
				success: function (e, t) {
					var i = e.results;
					d = i.length;
					var a = i.length;
					for (var s = 0; s < a; s++) {
						c = s;
						if (s !== 0) {
							var n = s - 1
						} else {
							n = 0;
							m.catList.push({
								PurchaseRequisition: i[s].PurchaseRequisition,
								PurchaseRequisitionItem: i[s].PurchaseRequisitionItem,
								Plant: i[s].Plant,
								Material: i[s].Material,
								DeliveryDate: i[s].DeliveryDate,
								RequestedDeliveryDate: i[s].RequestedDeliveryDate,
								CreationDate: i[s].CreationDate,
								AccountAssignmentCategory: i[s].AccountAssignmentCategory,
								FixedSupplier: i[s].FixedSupplier,
								OrganizationBPName1: i[s].OrganizationBPName1,
								ProductDescription: i[s].ProductDescription,
								ZZITEM: i[s].ZZITEM
							})
						}
						if (i[s].PurchaseRequisition !== i[n].PurchaseRequisition || i[s].PurchaseRequisitionItem !== i[n].PurchaseRequisitionItem) {
							m.catList.push({
								PurchaseRequisition: i[s].PurchaseRequisition,
								PurchaseRequisitionItem: i[s].PurchaseRequisitionItem,
								Plant: i[s].Plant,
								Material: i[s].Material,
								DeliveryDate: i[s].DeliveryDate,
								RequestedDeliveryDate: i[s].RequestedDeliveryDate,
								CreationDate: i[s].CreationDate,
								AccountAssignmentCategory: i[s].AccountAssignmentCategory,
								FixedSupplier: i[s].FixedSupplier,
								OrganizationBPName1: i[s].OrganizationBPName1,
								ProductDescription: i[s].ProductDescription,
								ZZITEM: i[s].ZZITEM
							})
						}
					}
					sap.ui.core.BusyIndicator.hide()
				},
				error: function (e) {}
			});
			this.bValid = e.getParameter("valid");
			s = JSON.stringify(s);
			this.from = s.slice(1, 11);
			n = JSON.stringify(n);
			this.to = n.slice(1, 11);
			this.getView().byId("mb").setValue(null)
		},
		funcA: function (e) {
			var t = this;
			P.newList.splice(0, P.newList.length);
			g.zList.splice(0, g.zList.length);
			var i = new sap.ui.model.json.JSONModel;
			this.getView().setModel(i, "MRP");
			if (this.from === undefined || this.to === undefined) {
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.show("Please Select Date Range", {
					icon: sap.m.MessageBox.Icon.WARNING,
					title: "Dear User",
					actions: [sap.m.MessageBox.Action.YES],
					onClose: function (e) {
						if (e === "YES") {
							t.getView().byId("mb").setValue(null);
							return
						}
					}
				})
			} else {
				sap.ui.core.BusyIndicator.show();
				var a = this.getView().getModel("modB");
				var s = e.getParameter("value");
				this.pcheck = s;
				var n = new Array;
				for (var r = 0; r < m.catList.length; r++) {
					var o = JSON.stringify(m.catList[r].CreationDate);
					o = o.slice(1, 11);
					if (m.catList[r].Plant === s) {
						P.newList.push({
							PurchaseRequisition: m.catList[r].PurchaseRequisition,
							PurchaseRequisitionItem: m.catList[r].PurchaseRequisitionItem,
							Plant: m.catList[r].Plant,
							Material: m.catList[r].Material,
							DeliveryDate: m.catList[r].DeliveryDate,
							RequestedDeliveryDate: m.catList[r].RequestedDeliveryDate,
							AccountAssignmentCategory: m.catList[r].AccountAssignmentCategory,
							FixedSupplier: m.catList[r].FixedSupplier,
							OrganizationBPName1: m.catList[r].OrganizationBPName1,
							ProductDescription: m.catList[r].ProductDescription,
							ZZITEM: m.catList[r].ZZITEM
						})
					}
				}
				if (P.newList.length === 0 || P.newList.length === undefined) {
					sap.ui.core.BusyIndicator.hide();
					var l = new sap.ui.model.json.JSONModel;
					this.getView().setModel(l, "MRP");
					t = this;
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.show("No Records Found for date " + this.from + " to " + this.to, {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Dear User",
						actions: [sap.m.MessageBox.Action.YES],
						onClose: function (e) {
							if (e === "YES") {
								t.getView().byId("mb").setValue(null);
								return
							}
						}
					})
				} else {
					for (var u = 0; u < P.newList.length; u++) {
						if (P.newList[u].AccountAssignmentCategory !== "Y") {
							n[u] = P.newList[u].Material
						}
					}
					var c = n.filter(function (e, t, i) {
						return i.indexOf(e) === t
					});
					var d = new sap.ui.model.Filter("MRPPlant", sap.ui.model.FilterOperator.EQ, s);
					var p = new sap.ui.model.Filter({
						filters: [d],
						and: true
					});
					var h = [];
					for (var M = 0; M < c.length; M++) {
						h.push(new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.EQ, c[M]))
					}
					var v = new sap.ui.model.Filter({
						filters: h,
						and: false
					});
					var R = new Array(new sap.ui.model.Filter({
						filters: [p, v],
						and: true
					}));
					a.read("/SupplyDemandItems", {
						async: false,
						filters: [R],
						success: function (e, t) {
							var i = e.results;
							var a = i.length;
							for (var s = 0; s < a; s++) {
								g.zList.push({
									MRPElementCategoryName: i[s].MRPElementCategoryName,
									MRPArea: i[s].MRPArea,
									MRPController: i[s].MRPController,
									SourceMRPElementItem: i[s].SourceMRPElementItem,
									SourceMRPElement: i[s].SourceMRPElement,
									Material: i[s].Material,
									MRPPlant: i[s].MRPPlant,
									MRPElementAvailyOrRqmtDate: i[s].MRPElementAvailyOrRqmtDate,
									ExceptionMessageText: i[s].ExceptionMessageText
								});
								sap.ui.core.BusyIndicator.hide()
							}
						},
						error: function (e) {
							sap.ui.core.BusyIndicator.hide()
						}
					})
				}
			}
		},
		onShow: function (e) {
			var t = this.getView().byId("mb").getValue();
			if (this.bValid === undefined || this.bValid === false || t === undefined || t === "") {
				sap.m.MessageToast.show("Please select valid Details");
				return
			} else {
				var i = "Fetching Report data ...  ";
				o.show(i);
				sap.ui.core.BusyIndicator.show();
				var a = new Array;
				var s = new Array;
				var n = new Array;
				var r = this.getView().byId("btnId");
				var u = {
					yList: []
				};
				var c = {
					jList: []
				};
				var d = {
					finalList: []
				};
				var m = " ";
				for (var p = 0; p < P.newList.length; p++) {
					m = " ";
					if (P.newList[p].DeliveryDate === null) {
						var h
					} else {
						h = JSON.stringify(P.newList[p].DeliveryDate);
						h = h.slice(1, 11)
					}
					if (P.newList[p].RequestedDeliveryDate === null) {
						var M
					} else {
						M = JSON.stringify(P.newList[p].RequestedDeliveryDate);
						M = M.slice(1, 11)
					}
					for (var v = 0; v < g.zList.length; v++) {
						if (P.newList[p].PurchaseRequisition === g.zList[v].SourceMRPElement && g.zList[v].MRPElementCategoryName ===
							"Purchase requisition" && P.newList[p].ZZITEM === g.zList[v].SourceMRPElementItem) {
							m = "X";
							d.finalList.push({
								MRPElementCategoryName: g.zList[v].MRPElementCategoryName,
								SourceMRPElementItem: g.zList[v].SourceMRPElementItem,
								MRPArea: g.zList[v].MRPArea,
								SourceMRPElement: g.zList[v].SourceMRPElement,
								Material: g.zList[v].Material,
								MRPController: g.zList[v].MRPController,
								MRPPlant: g.zList[v].MRPPlant,
								MRPElementAvailyOrRqmtDate: g.zList[v].MRPElementAvailyOrRqmtDate,
								ExceptionMessageText: g.zList[v].ExceptionMessageText,
								FixedSupplier: P.newList[p].FixedSupplier,
								OrganizationBPName1: P.newList[p].OrganizationBPName1,
								ProductDescription: P.newList[p].ProductDescription,
								DeliveryDate: h,
								RequestedDeliveryDate: M
							})
						}
					}
					if (m !== "X") {
						d.finalList.push({
							SourceMRPElement: P.newList[p].PurchaseRequisition,
							SourceMRPElementItem: P.newList[p].ZZITEM,
							Material: P.newList[p].Material,
							MRPPlant: P.newList[p].Plant,
							FixedSupplier: P.newList[p].FixedSupplier,
							OrganizationBPName1: P.newList[p].OrganizationBPName1,
							ProductDescription: P.newList[p].ProductDescription,
							DeliveryDate: h,
							RequestedDeliveryDate: M
						});
						m = " "
					}
				}
			}
			if (d.finalList.length <= 0 || d.finalList.length === undefined) {
				sap.m.MessageToast.show("No Records Found");
				var R = new sap.ui.model.json.JSONModel;
				this.getView().setModel(R, "MRP")
			} else {
				l.setData(d);
				l.setSizeLimit(1e6);
				this.getView().setModel(l, "MRP")
			}
			sap.ui.core.BusyIndicator.hide()
		},
		onReset: function (e) {
			var t = " ";
			this.getView().byId("mb").setValue(t);
			this.getView().byId("DRS3").setValue(t)
		},
		onClear: function (e) {
			var t = " ";
			this.getView().byId("mb").setValue(t);
			this.getView().byId("DRS3").setValue(t)
		},
		onOpen: function () {
			var e = this.getView().getModel("i18n").getResourceBundle();
			var t = e.getText("https://my301271.s4hana.ondemand.com/ui#PurchaseRequisition-manage?source=lpd").toString().trim();
			window.open(t, "_blank")
		},
		onDataExport: function () {
			var e = this.getView().getModel("MRP");
			var t = new s({
				exportType: new n({
					charset: "utf-8",
					fileExtension: "csv",
					separatorChar: ",",
					mimeType: "application/csv"
				}),
				models: e,
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
				}, {
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
				}, {
					name: "Supplier",
					template: {
						content: "{FixedSupplier}"
					}
				}, {
					name: "Supplier Name",
					template: {
						content: "{OrganizationBPName1}"
					}
				}, {
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
				}]
			});
			t.saveFile().catch(function (e) {
				sap.m.MessageToast.show("Error")
			}).then(function () {
				t.destroy()
			})
		}
	})
});