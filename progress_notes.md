#Data Visualisation Project
-------

Aim to

* improve javascript and d3.js skills
* make use of data.gov.ie dataset - (noise monitoring)

Plan to

* build dashboard for interactive data visualisation of noise in dublin
	* initially want to display data on svg map of dublin and the time of day can be varied to display the change.
	* future builds will enable
		- date selection
		- change data presentation

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
	* used the .center attribute of the projection to select one of the noise monitoring stations making calculation of translate more straighforward (and eliminating guessing) 	
	* could look into [this](http://mikefowler.me/journal/2014/06/10/drawing-geojson-in-a-canvas) if still want to try implement the bounding box calculation

* Ran into problem when adding points to map with lat, long coordinates - switching the coordinates order seemed to solve it see this [stackoverflow answer](https://stackoverflow.com/questions/20987535/plotting-points-on-a-map-with-d3)

* Wasn't able to successfully use the json points to add new elements to the svg - solved with this [stackoverflow answer ](https://stackoverflow.com/questions/21562417/bars-not-appending-in-the-dom-with-d3-js-barchart)

* ```Problem``` :  No 'Access-Control-Allow-Origin' header is present on the requested resource. Solution: used https://cors.io/?
	* Might be better to look into 	[this resource](https://www.html5rocks.com/en/tutorials/cors/) and [this](https://enable-cors.org/client.html)
	* Also this [ajax explantion](https://www.kirupa.com/html5/making_http_requests_js.htm)
	* [this](https://github.com/d3/d3-plugins/tree/master/jsonp) could be used to find a solution - api doesn't seem to support (also apparently not secure)
	
*  Request is asynchronous so the script is trying to access the locationData before it has been retrieved from the api -- look into "callbacks" to resolve this.
	* made use of 'queue' to ensure certain calls were completed before callback to map drawing.	  


* Failed to load https://cors.io/?http://dublincitynoise.sonitussystems.com/applications/api/dublinnoisedata.php?location=1: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8000' is therefore not allowed access. The response had HTTP status code 503.
	* cors.io was overloaded - could set up my own cors proxy with heroku

* couldn't delete mouseover text by id -- id i was using included spaces so replaced by number id prefixed by t

* data from api contains 210 entries for "time" but ends at an earlier time than expected from number of entries. -- there was repeated sequence in the time array returned by the api - 1:00 - 1:55

* update function wasn't working- think input event listener wasn't firing changed it so onchange is in html and call update

* ```unsolved``` now showTime isn't working and console.log does not seem to be working either.

* ```unsolved``` data loading sign no longer appearing .... 
 
* possibly fixed both above by moving script down to bottom of body but not sure as cors.io is overloaded.
	
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
3. 24/10/17
	* added d3.js queue to enable loading of data before drawing the map
	* added "data is loading" sign
	* added better scaling for the map using .center
4. 25/10/17
	* cors.io is back up
	* fixed mouseover text - selecting by id
	* added slider which displays time selected
5. 29/10/17
	* fixed time display - starts at 00:05 not 00:00 
	* added function to update the circles as the slider input is changed
	
##ToDo

* ~~display static points on map ~~
* ~~display the json data on map~~
* check the points as displayed are correct
* ~~enable mouseover display of text which reveals names of stations~~
* ~~encorporate data into the size/colour of station points~~
* ~~use the api to provide the data for the station points~~
* ~~add slider to change the time selected to display~~
* ~~tie slider input to time selected for data~~
* ~~improve the scaling solution~~
	* set up automatic bounds to enable easier scaling 
* improve the visuals
* check mapping of noise data to size and colour - may be amplifying unimportant variation
* change length of slider so it matches length of shortest location array
* fix data loading notice



	