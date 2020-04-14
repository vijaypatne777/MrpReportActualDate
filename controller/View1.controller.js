sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/util/Export","sap/ui/core/util/ExportTypeCSV","sap/ui/core/library","sap/m/MessageToast"],function(e,t,i,a,s,n,r,o){"use strict";var l=new t;var u=r.ValueState;var c;var d;var p={catList:[]};var m={pList:[]};var g={newList:[]};var P={zList:[]};var h={carrList:[]};return e.extend("com.qb2i4.qb2i4.controller.View1",{onInit:function(){sap.ui.getCore().getConfiguration().setLanguage("en");sap.ui.getCore().attachLocalizationChanged(function(e){var t=e.getParameter("changes");if(t&&t.language){this._bundle=sap.ui.getCore().getLibraryResourceBundle("sap.m",t.language);this.rerender()}}.bind(this));var e=this;sap.ui.core.BusyIndicator.show();var t=new sap.ui.model.json.JSONModel;var i="/OPENSAP/sap/opu/odata/sap/YY1_PLANT_API_CDS/";var a=new sap.ui.model.odata.ODataModel(i,true);var s="YY1_Plant_API";a.read(s,{async:false,success:function(t,i){var a=t.results;d=a.length;var s=a.length;for(var n=0;n<s;n++){c=n;m.pList.push({Plant:a[n].Plant});if(d===c+1&&d!==undefined&&c!==undefined){e.abcd()}}sap.ui.core.BusyIndicator.hide()},error:function(e){}})},abcd:function(){for(var e=0;e<m.pList.length;e++){h.carrList[e]=m.pList[e].Plant}var t=h.carrList.filter(function(e,t,i){return i.indexOf(e)===t});this.h=t;var i={pList:[]};for(var a=0;a<t.length;a++){i.pList.push({Plant:t[a]})}var s=new sap.ui.model.json.JSONModel;s.setData(i);this.getView().setModel(s);this.getView().byId("mb").setValue(null)},handleChange:function(e){p.catList.splice(0,p.catList.length);g.newList.splice(0,g.newList.length);P.zList.splice(0,P.zList.length);var t=new sap.ui.model.json.JSONModel;this.getView().setModel(t,"MRP");var s=e.getParameter("from"),n=e.getParameter("to");var r=new i({path:"CreationDate",operator:a.BT,value1:s,value2:n});sap.ui.core.BusyIndicator.show();var o=this.getView().getModel("modA");o.read("/YY1_Pur_req_MRP",{filters:[r],async:false,success:function(e,t){var i=e.results;d=i.length;var a=i.length;for(var s=0;s<a;s++){c=s;if(s!==0){var n=s-1}else{n=0;p.catList.push({PurchaseRequisition:i[s].PurchaseRequisition,PurchaseRequisitionItem:i[s].PurchaseRequisitionItem,Plant:i[s].Plant,Material:i[s].Material,DeliveryDate:i[s].DeliveryDate,RequestedDeliveryDate:i[s].RequestedDeliveryDate,CreationDate:i[s].CreationDate,AccountAssignmentCategory:i[s].AccountAssignmentCategory,FixedSupplier:i[s].FixedSupplier,OrganizationBPName1:i[s].OrganizationBPName1,ProductDescription:i[s].ProductDescription,ZZITEM:i[s].ZZITEM})}if(i[s].PurchaseRequisition!==i[n].PurchaseRequisition||i[s].PurchaseRequisitionItem!==i[n].PurchaseRequisitionItem){p.catList.push({PurchaseRequisition:i[s].PurchaseRequisition,PurchaseRequisitionItem:i[s].PurchaseRequisitionItem,Plant:i[s].Plant,Material:i[s].Material,DeliveryDate:i[s].DeliveryDate,RequestedDeliveryDate:i[s].RequestedDeliveryDate,CreationDate:i[s].CreationDate,AccountAssignmentCategory:i[s].AccountAssignmentCategory,FixedSupplier:i[s].FixedSupplier,OrganizationBPName1:i[s].OrganizationBPName1,ProductDescription:i[s].ProductDescription,ZZITEM:i[s].ZZITEM})}}sap.ui.core.BusyIndicator.hide()},error:function(e){}});this.bValid=e.getParameter("valid");s=JSON.stringify(s);this.from=s.slice(1,11);n=JSON.stringify(n);this.to=n.slice(1,11);this.getView().byId("mb").setValue(null)},funcA:function(e){var t=this;g.newList.splice(0,g.newList.length);P.zList.splice(0,P.zList.length);var i=new sap.ui.model.json.JSONModel;this.getView().setModel(i,"MRP");if(this.from===undefined||this.to===undefined){jQuery.sap.require("sap.m.MessageBox");sap.m.MessageBox.show("Please Select Date Range",{icon:sap.m.MessageBox.Icon.WARNING,title:"Dear User",actions:[sap.m.MessageBox.Action.YES],onClose:function(e){if(e==="YES"){t.getView().byId("mb").setValue(null);return}}})}else{sap.ui.core.BusyIndicator.show();var a=this.getView().getModel("modB");var s=e.getParameter("value");this.pcheck=s;var n=new Array;for(var r=0;r<p.catList.length;r++){var o=JSON.stringify(p.catList[r].CreationDate);o=o.slice(1,11);if(p.catList[r].Plant===s){g.newList.push({PurchaseRequisition:p.catList[r].PurchaseRequisition,PurchaseRequisitionItem:p.catList[r].PurchaseRequisitionItem,Plant:p.catList[r].Plant,Material:p.catList[r].Material,DeliveryDate:p.catList[r].DeliveryDate,RequestedDeliveryDate:p.catList[r].RequestedDeliveryDate,AccountAssignmentCategory:p.catList[r].AccountAssignmentCategory,FixedSupplier:p.catList[r].FixedSupplier,OrganizationBPName1:p.catList[r].OrganizationBPName1,ProductDescription:p.catList[r].ProductDescription,ZZITEM:p.catList[r].ZZITEM})}}if(g.newList.length===0||g.newList.length===undefined){sap.ui.core.BusyIndicator.hide();var l=new sap.ui.model.json.JSONModel;this.getView().setModel(l,"MRP");t=this;jQuery.sap.require("sap.m.MessageBox");sap.m.MessageBox.show("No Records Found for date "+this.from+" to "+this.to,{icon:sap.m.MessageBox.Icon.ERROR,title:"Dear User",actions:[sap.m.MessageBox.Action.YES],onClose:function(e){if(e==="YES"){t.getView().byId("mb").setValue(null);return}}})}else{for(var u=0;u<g.newList.length;u++){if(g.newList[u].AccountAssignmentCategory!=="Y"){n[u]=g.newList[u].Material}}var c=n.filter(function(e,t,i){return i.indexOf(e)===t});var d=new sap.ui.model.Filter("MRPPlant",sap.ui.model.FilterOperator.EQ,s);var m=new sap.ui.model.Filter({filters:[d],and:true});var h=[];for(var v=0;v<c.length;v++){h.push(new sap.ui.model.Filter("Material",sap.ui.model.FilterOperator.EQ,c[v]))}var M=new sap.ui.model.Filter({filters:h,and:false});var f=new Array(new sap.ui.model.Filter({filters:[m,M],and:true}));a.read("/SupplyDemandItems",{async:false,filters:[f],success:function(e,t){var i=e.results;var a=i.length;for(var s=0;s<a;s++){P.zList.push({MRPElementCategoryName:i[s].MRPElementCategoryName,MRPArea:i[s].MRPArea,SourceMRPElementItem:i[s].SourceMRPElementItem,SourceMRPElement:i[s].SourceMRPElement,Material:i[s].Material,MRPPlant:i[s].MRPPlant,MRPElementAvailyOrRqmtDate:i[s].MRPElementAvailyOrRqmtDate,ExceptionMessageText:i[s].ExceptionMessageText});sap.ui.core.BusyIndicator.hide()}},error:function(e){sap.ui.core.BusyIndicator.hide()}})}}},onShow:function(e){var t=this.getView().byId("mb").getValue();if(this.bValid===undefined||this.bValid===false||t===undefined||t===""){sap.m.MessageToast.show("Please select valid Details");return}else{var i="Fetching Report data ...  ";o.show(i);sap.ui.core.BusyIndicator.show();var a=new Array;var s=new Array;var n=new Array;var r=this.getView().byId("btnId");var u={yList:[]};var c={jList:[]};var d={finalList:[]};var p=" ";for(var m=0;m<g.newList.length;m++){p=" ";if(g.newList[m].DeliveryDate===null){var h}else{h=JSON.stringify(g.newList[m].DeliveryDate);h=h.slice(1,11)}if(g.newList[m].RequestedDeliveryDate===null){var v}else{v=JSON.stringify(g.newList[m].RequestedDeliveryDate);v=v.slice(1,11)}for(var M=0;M<P.zList.length;M++){if(g.newList[m].PurchaseRequisition===P.zList[M].SourceMRPElement&&P.zList[M].MRPElementCategoryName==="Purchase requisition"&&g.newList[m].ZZITEM===P.zList[M].SourceMRPElementItem){p="X";d.finalList.push({MRPElementCategoryName:P.zList[M].MRPElementCategoryName,SourceMRPElementItem:P.zList[M].SourceMRPElementItem,MRPArea:P.zList[M].MRPArea,SourceMRPElement:P.zList[M].SourceMRPElement,Material:P.zList[M].Material,MRPPlant:P.zList[M].MRPPlant,MRPElementAvailyOrRqmtDate:P.zList[M].MRPElementAvailyOrRqmtDate,ExceptionMessageText:P.zList[M].ExceptionMessageText,FixedSupplier:g.newList[m].FixedSupplier,OrganizationBPName1:g.newList[m].OrganizationBPName1,ProductDescription:g.newList[m].ProductDescription,DeliveryDate:h,RequestedDeliveryDate:v})}}if(p!=="X"){d.finalList.push({SourceMRPElement:g.newList[m].PurchaseRequisition,SourceMRPElementItem:g.newList[m].ZZITEM,Material:g.newList[m].Material,MRPPlant:g.newList[m].Plant,FixedSupplier:g.newList[m].FixedSupplier,OrganizationBPName1:g.newList[m].OrganizationBPName1,ProductDescription:g.newList[m].ProductDescription,DeliveryDate:h,RequestedDeliveryDate:v});p=" "}}}if(d.finalList.length<=0||d.finalList.length===undefined){sap.m.MessageToast.show("No Records Found");var f=new sap.ui.model.json.JSONModel;this.getView().setModel(f,"MRP")}else{l.setData(d);l.setSizeLimit(1e6);this.getView().setModel(l,"MRP")}sap.ui.core.BusyIndicator.hide()},onReset:function(e){var t=" ";this.getView().byId("mb").setValue(t);this.getView().byId("DRS3").setValue(t)},onClear:function(e){var t=" ";this.getView().byId("mb").setValue(t);this.getView().byId("DRS3").setValue(t)},onOpen:function(){var e=this.getView().getModel("i18n").getResourceBundle();var t=e.getText("Login").toString().trim();window.open(t,"_blank")},onDataExport:function(){var e=this.getView().getModel("MRP");var t=new s({exportType:new n({charset:"utf-8",fileExtension:"csv",separatorChar:",",mimeType:"application/csv"}),models:e,rows:{path:"/finalList"},columns:[{name:"Purchase Requisition",template:{content:"{SourceMRPElement}"}},{name:"Item",template:{content:"{SourceMRPElementItem}"}},{name:"Plant",template:{content:"{MRPPlant}"}},{name:"MRP Area",template:{content:"{MRPArea}"}},{name:"Material",template:{content:"{Material}"}},{name:"Material Description",template:{content:"{ProductDescription}"}},{name:"Supplier",template:{content:"{FixedSupplier}"}},{name:"Supplier Name",template:{content:"{OrganizationBPName1}"}},{name:"Delivery Date",template:{content:"{DeliveryDate}"}},{name:"Actual need date",template:{content:"{ExceptionMessageText}"}},{name:"Requested Delivery Date",template:{content:"{RequestedDeliveryDate}"}}]});t.saveFile().catch(function(e){sap.m.MessageToast.show("Error")}).then(function(){t.destroy()})}})});