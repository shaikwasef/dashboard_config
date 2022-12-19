var fs = require('fs');

const cubesCollection = require('./reg_dashboard_cubes');
const filtersCollection = require('./reg_dashboard_filters');
const widgetsCollection = require('./reg_dashboard_widgets');
const { myTenantId } = require('./constants');

const {ObjectId} = require('mongodb'); 

let updatedWidgetsCollection = widgetsCollection.map((item) => {
	const myId = new ObjectId();
	let cube = item["cube"];
	for(let i = 0 ; i < cubesCollection.length ; i++ ){
		if(cubesCollection[i]["id"] === cube ){
				cube = cubesCollection[i]["_id"];
				break;
			}
	}
	item = {...item  , "cube" : cube , "tenantId" : myTenantId , "_id" : {"$oid": myId }}
	return item;
})

updatedWidgetsCollection.filter(item => item["filters"]).forEach((item) => {
	let itemFilters = item.filters;
	itemFilters.forEach((itemFilter,index) => {
		for(let i = 0 ; i < filtersCollection.length ; i++){
			if(filtersCollection[i]["id"] === itemFilter ){
				itemFilters[index] = filtersCollection[i]["_id"];
			}
		}
	})
	return {...item };
})

updatedWidgetsCollection.filter(item => item["dropDownFilters"]).forEach((item) => {
	let itemFilters = item.dropDownFilters;
	itemFilters.forEach((itemFilter,index) => {
		for(let i = 0 ; i < filtersCollection.length ; i++){
			if(filtersCollection[i]["id"] === itemFilter ){
				itemFilters[index] = filtersCollection[i]["_id"];
			}
		}
	})
	return {...item };
})

fs.unlinkSync('reg_dashboard_widgets.json');

fs.writeFile("reg_dashboard_widgets.json",JSON.stringify(updatedWidgetsCollection),function(err, result) {
    if(err) console.log('error', err);
});