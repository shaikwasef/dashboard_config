var fs = require('fs');

// const widgetsCollection = require('./reg_dashboard_widgets');
const cubesCollection = require('./reg_dashboard_cubes');
const filtersCollection = require('./reg_dashboard_filters');
// const dashboardsCollection = require('./reg_dashboard_dashboards');

cubesCollection.filter(item => item["applicableFilters"]).map((item) => {
	let cubeFilters = item.applicableFilters;
	cubeFilters.forEach((cubeFilter) => {
		for(let i = 0 ; i < filtersCollection.length ; i++){
			if(filtersCollection[i]["id"] ===cubeFilter["id"] ){
				cubeFilter["id"] = filtersCollection[i]["_id"];
			}
		}
	})
	item = {filters : cubeFilters , ...item }
	return item;
})

fs.writeFile("reg_dashboard_cubes_populated.json",JSON.stringify(cubesCollection),function(err, result) {
    if(err) console.log('error', err);
});

// widgetsCollection.filter(item => item["filters"]).map((item) => {
// 	let itemFilters = item.filters;
// 	itemFilters.forEach((itemFilter) => {
// 		filtersCollection.forEach((filter) => {
// 			if(itemFilter["id"] === filter["id"]){
// 				itemFilter["id"] = filter["_id"];
// 			}
// 		})
// 	})
// 	item = {filters : itemFilters , ...item }
// 	return item;
// })

// fs.writeFile("reg_dashboard_widgets_populated.json",JSON.stringify(widgetsCollection),function(err, result) {
//     if(err) console.log('error', err);
// });



