Steps to use the migration script : 

1. Update your tenantId in the constants.js file . 

2. Update the reg_dashboard_filters ,  reg_dashboard_cubes ,reg_dashboard_widgets , 		 reg_dashboards.json file or add them if absent from your regology repo branch .

3. Run the scripts in the following order using a JS runner extensions ( such as code runner)
	 reg_dashboard_filters -> reg_dashboard_cubes -> reg_dashboard_widgets -> reg_dashboards.json.

4. New json files are created with '_mongo' extension 

5. Update reg_dashboard_filters ,  reg_dashboard_cubes ,reg_dashboard_widgets , 		 reg_dashboards.json collections in RegHub data base with the new json files. 