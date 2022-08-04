var fs = require('fs');

const cubesCollection = require('./reg_dashboard_cubes_mongo');
const filtersCollection = require('./reg_dashboard_filters');
const widgetsCollection = require('./reg_dashboard_widgets');

let updatedWidgetsCollection = widgetsCollection.map((item) => {
	let cube = item["cube"];
	for(let i = 0 ; i < cubesCollection.length ; i++ ){
		if(cubesCollection[i]["id"] === cube ){
				cube = cubesCollection[i]["_id"];
				break;
			}
	}
	const tenantId  = "60bdf4253f08118fcef4f30a";
	item = {...item  , "cube" : cube , "tenantId" : tenantId }
	return item;
})

updatedWidgetsCollection.filter(item => item["filters"]).forEach((item) => {
	let itemFilters = item.filters;
	itemFilters.forEach((itemFilter) => {
		for(let i = 0 ; i < filtersCollection.length ; i++){
			if(filtersCollection[i]["id"] === itemFilter["id"] ){
				itemFilter["id"] = filtersCollection[i]["_id"];
			}
		}
	})
})



fs.writeFile("reg_dashboard_widgets_post_script.json",JSON.stringify(updatedWidgetsCollection),function(err, result) {
    if(err) console.log('error', err);
});