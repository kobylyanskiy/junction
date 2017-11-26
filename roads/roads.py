import urllib
import json


class Road:
    request_text = "https://api.mapbox.com/directions/v5/mapbox/driving/{}%2C{}%3B{}%2C{}" \
                        ".json?access_token=pk.eyJ1Ijoia29ieWx5YW5za2l5IiwiYSI6ImNqOWw5cHJyMDF" \
                        "ueDcydm12cnFsaGFwMTMifQ.aOlxcyLnEoh1E70BQAXa_g"

    @staticmethod
    def get_json_response(longitude_from, latitude_from, longitude_to, latitude_to):
        return urllib.request.urlopen(Road.request_text.format(longitude_from, latitude_from,
                                                               longitude_to, latitude_to)).read()

    @staticmethod
    def get_duration(js):
        return js['routes'][0]['duration']

    @staticmethod
    def get_distance(js):
        return js['routes'][0]['distance']

    @staticmethod
    def get_code(js):
        return js['code']

    @staticmethod
    def find_road(longitude_from, latitude_from, longitude_to, latitude_to):
        json_response = Road.get_json_response(longitude_from, latitude_from, longitude_to, latitude_to)
        js = json.loads(json_response.decode('utf8').replace("'", '"'))
        returncode = Road.get_code(js)
        print('returncode: {}\n\n'.format(returncode))
        if 'Ok' not in returncode:
            return 0, 0
        return Road.get_duration(js), Road.get_distance(js)

    @staticmethod
    def get_duration_and_distance(longitude_from, latitude_from, longitude_to, latitude_to):
        tuple = Road.find_road(longitude_from, latitude_from, longitude_to, latitude_to)
        return "Duration: {}\nDistance: {}".format(tuple[0], tuple[1])
