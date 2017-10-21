#Data Visualisation Project
-------

Aim to

* improve javascript and d3.js skills
* make use of data.gov.ie dataset - (noise monitoring)

Plan to

* build dashboard for interactive data visualisation of noise in dublin
	* initial build will display data on svg map of dublin and the time of day can be varied to display the change.
	* future builds will enable
		- date selection
		- type of display selection

---

* [Api Docs](http://dublincitynoise.sonitussystems.com/applications/api/api-doc.html)
* [Spatial Data](http://libguides.ucd.ie/gisguide/FindSpatialData)
* [Map Data used from this website](https://www.townlands.ie/page/download/)
* [Calling REST API with javascript](https://stackoverflow.com/questions/247483/http-get-request-in-javascript) 
##Problems encountered

* API currently doesn't provide lat, long coordinates so got approximate coordinates from Google Maps using the location names provided.
* javascript can't display local files - run simple http server to test locally.


	```
	python -m SimpleHTTPServer 
	``` 



* Scaling the geojson file involved a lot of trial and error - if i better understood d3's path.bounds option could've used this [stackoverflow answer](https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object)

* Ran into problem when adding points to map with lat, long coordinates - switching the coordinates order seemed to solve it see this [stackoverflow answer](https://stackoverflow.com/questions/20987535/plotting-points-on-a-map-with-d3)

* Wasn't able to successfully use the json points to add new elements to the svg - solved with this [stackoverflow answer ](https://stackoverflow.com/questions/21562417/bars-not-appending-in-the-dom-with-d3-js-barchart)

* Problem :  No 'Access-Control-Allow-Origin' header is present on the requested resource. Solution: used https://cors.io/?
	* Might be better to look into 	[this resource](https://www.html5rocks.com/en/tutorials/cors/)
	* Also this [ajax explantion](https://www.kirupa.com/html5/making_http_requests_js.htm)
* ```unsolved``` Request is asynchronous so the script is trying to access the locationData before it has been retrieved from the api -- could potentially look into "callbacks" to resolve this.
	
## Timeline
1. 13/10/17
	* found spatial data and downloaded ireland geojson file
	* wrote python script to extract dublin data into separate geojson file
	* wrote preliminary html file to display geojson data - figured out scaling & translate params by trial and error
2. 15/10/17
	* added d3.js code to add points to map based on coordinates 
	* add code to use the json coordinate file to add points
	* added mouseover text
	* added api calls to store current days location data
	
## Immediate ToDo

* ~~display static points on map ~~
* ~~display the json data on map~~
* check the points as displayed are correct
* ~~enable mouseover display of text which reveals names of stations~~
* ~~encorporate data into the size/colour of station points~~
* use the api to provide the data for the station points
* improve the scaling solution
* improve the visuals

	