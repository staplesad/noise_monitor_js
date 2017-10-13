import json
import pprint

file_in = "baronies.geojson"
file_out = "dublin.geojson"
json_data = open(file_in).read()
data = json.loads(json_data)
dublindata = {"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    } },
"features": []
        }

for item in data['features']:
    if item["properties"]["CO_NAME"]=="Dublin":
        if item["properties"]["NAME_EN"] is None:
            item["properties"]["NAME_EN"] = "City of Dublin"
        dublindata['features'].append(item)
        print item["properties"]["NAME_EN"]
outputdata = json.dumps(dublindata)
open(file_out, "w+").write(outputdata)

print 'DONE'
