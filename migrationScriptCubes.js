var fs = require('fs');

const cubesCollection = require('./reg_dashboard_cubes');
const filtersCollection = require('./reg_dashboard_filters');

const updatedCollection = cubesCollection.map((item) => {
	let cubeFilters = item.applicableFilters;
	cubeFilters.forEach((cubeFilter) => {
		for(let i = 0 ; i < filtersCollection.length ; i++){
			if(filtersCollection[i]["id"] === cubeFilter["id"] ){
				cubeFilter["id"] = filtersCollection[i]["_id"];
			}
		}
	})
	const tenantId  = "60bdf4253f08118fcef4f30a";
	item = {...item , "tenantId" : tenantId }
	return item;
})

fs.writeFile("reg_dashboard_cubes_post_script.json",JSON.stringify(updatedCollection),function(err, result) {
    if(err) console.log('error', err);
});