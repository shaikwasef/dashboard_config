var fs = require('fs');

const cubesCollection = require('./reg_dashboard_cubes');
const filtersCollection = require('./reg_dashboard_filters');
const { myTenantId } = require('./constants');
const {ObjectId} = require('mongodb'); 


const updatedCollection = cubesCollection.map((item) => {
	const myId = new ObjectId();
	let cubeFilters = item.applicableFilters;
	cubeFilters.forEach((cubeFilter,index) => {
		for(let i = 0 ; i < filtersCollection.length ; i++){
			if(filtersCollection[i]["id"] === cubeFilter ){
				cubeFilters[index] = filtersCollection[i]["_id"];
			}
		}
	})
	const updatedItem = {...item , "tenantId" : myTenantId , "_id" : {"$oid": myId }};
	return updatedItem;
})

fs.unlinkSync('reg_dashboard_cubes.json');

fs.writeFile("reg_dashboard_cubes.json",JSON.stringify(updatedCollection),function(err, result) {
    if(err) console.log('error', err);
});