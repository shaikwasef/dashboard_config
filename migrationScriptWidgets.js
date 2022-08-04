var fs = require('fs');

const cubesCollection = require('./reg_dashboard_cubes_populated');
const filtersCollection = require('./reg_dashboard_filters');
const widgetsCollection = require('./reg_dashboard_widgets');

const updatedWidgetsCollection = widgetsCollection.filter(item => item["filters"]).map((item) => {
	let itemFilters = item.filters;
	itemFilters.forEach((itemFilter) => {
		for(let i = 0 ; i < filtersCollection.length ; i++){
			if(filtersCollection[i]["id"] === itemFilter["id"] ){
				itemFilter["id"] = filtersCollection[i]["_id"];
			}
		}
	})
	const cube = item["cube"];
	cubesCollection
	return item;
})

// // fs.writeFile("reg_dashboard_widgets_populated.json",JSON.stringify(widgetsCollection),function(err, result) {
// //     if(err) console.log('error', err);
// // });