var fs = require('fs');

const filtersCollection = require('./reg_dashboard_filters');
const  myTenantId  = require('./constants');

const {ObjectId} = require('mongodb'); 

const updatedCollection = filtersCollection.map((item) => {
	const myId = new ObjectId();
	const updatedItem = {...item , "tenantId" : myTenantId , "_id" : {"$oid": myId }};
	return updatedItem;
})

fs.writeFile("reg_dashboard_filters_mongo.json",JSON.stringify(updatedCollection),function(err, result) {
    if(err) console.log('error', err);
});