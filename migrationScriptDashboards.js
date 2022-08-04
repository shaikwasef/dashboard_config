var fs = require('fs');

const dashboardsCollection = require('./reg_dashboards');
const widgetsCollection = require('./reg_dashboard_widgets_mongo.json');

let updateddashboardsCollection = dashboardsCollection.map((item) => {
	let widgets = item["widgets"];
	widgets.forEach((widget) => {
		for(let i = 0 ; i < widgetsCollection.length ; i++){
			if(widget["widgetId"] === widgetsCollection[i]["id"]){
				widget["widgetId"] = widgetsCollection[i]["_id"];
			}
		}
	})
	const tenantId  = "60bdf4253f08118fcef4f30a";
	item = {...item  , "tenantId" : tenantId }
	return item;
})

fs.writeFile("reg_dashboard_dashboards_post_script.json",JSON.stringify(updateddashboardsCollection),function(err, result) {
    if(err) console.log('error', err);
});