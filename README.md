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

##Problems encountered

* API currently doesn't provide lat, long coordinates so got approximate coordinates from Google Maps using the location names provided.
* javascript can't display local files - run simple http server to test locally.


	```
	python -m SimpleHTTPServer 
	``` 



* Scaling the geojson file involved a lot of trial and error - if i better understood d3's path.bounds option could've used this [stackoverflow answer](https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object)


## Timeline
1. 13/10/17
	* found spatial data and downloaded ireland geojson file
	* wrote python script to extract dublin data into separate geojson file
	* wrote preliminary html file to display geojson data - figured out scaling & translate params by trial and error
	
## Immediate ToDo

* display static points on map which correspond to the monitering stations
* enable mouseover display of text which reveals names of stations
* encorporate data into the size/colour of station points

	