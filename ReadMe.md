Steps to use the migration script : 

>npm install 


1. Update your tenantId in the constants.js file . 

2. Update the reg_dashboard_filters ,  reg_dashboard_cubes ,reg_dashboard_widgets , 		 reg_dashboards.json file or add them if absent from your regology repo branch .

3. Run the scripts in the following order using a JS runner extensions ( such as code runner)
	 reg_dashboard_filters -> reg_dashboard_cubes -> reg_dashboard_widgets -> reg_dashboards.json.

4. The pre uploaded json files are modifed with the respective mapping and tenant Id

Use the below mongoDB commands in your terminal to drop old and  import fresh files 
>mongo RegHub --eval 'db.reg_dashboards.drop()'
> mongoimport --uri <uri> --db <dbName> --collection <collectioName>  <filename> --jsonArray

Example - 
Step 1 : 
 mongo RegHub --eval 'db.reg_dashboards.drop()'
 mongo RegHub --eval 'db.reg_dashboard_filters.drop()'
 mongo RegHub --eval 'db.reg_dashboard_widgets.drop()'
 mongo RegHub --eval 'db.reg_dashboard_cubes.drop()'

Step 2 : 
 mongoimport --uri mongodb://localhost:27017/ --db RegHub --collection reg_dashboards  reg_dashboards.json --jsonArray

 mongoimport --uri mongodb://localhost:27017/ --db RegHub --collection reg_dashboard_widgets  reg_dashboard_widgets.json --jsonArray

 mongoimport --uri mongodb://localhost:27017/ --db RegHub --collection reg_dashboard_cubes  reg_dashboard_cubes.json --jsonArray

 mongoimport --uri mongodb://localhost:27017/ --db RegHub --collection reg_dashboard_filters reg_dashboard_filters.json --jsonArray