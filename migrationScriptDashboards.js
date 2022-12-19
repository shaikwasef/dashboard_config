var fs = require('fs');

const dashboardsCollection = require('./reg_dashboards');
const widgetsCollection = require('./reg_dashboard_widgets.json');
const { myTenantId } = require('./constants');

const {ObjectId} = require('mongodb'); 

let updateddashboardsCollection = dashboardsCollection.map((item) => {
	const myId = new ObjectId();
	let widgets = item["widgets"];
	widgets.forEach((widget) => {
		for(let i = 0 ; i < widgetsCollection.length ; i++){
			if(widget["widgetId"] === widgetsCollection[i]["id"]){
				widget["widgetId"] = widgetsCollection[i]["_id"];
			}
		}
	})
	const widgetsItem = widgets.map((item) => {
		return {
			"widget" : item.widgetId,
			"layout" : item.layout,
			"viewType" : item.viewType
		}
	})
	const updatedItem = {...item , "widgets" : widgetsItem  , "tenantId" : myTenantId ,  "_id" : {"$oid": myId}}
	return updatedItem;
})

fs.unlinkSync('reg_dashboards.json');

fs.writeFile("reg_dashboards.json",JSON.stringify(updateddashboardsCollection),function(err, result) {
    if(err) console.log('error', err);
});