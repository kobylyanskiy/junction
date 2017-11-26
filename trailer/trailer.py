import json

class Trailer:
    def __init__(self, id, status, rfid, longitude, latitude):
        self.id = id
        self.status = status
        self.rfid = rfid
        self.latitude = latitude
        self.longitude = longitude

    def set_city_from(self, city_from):
        self.city_from = city_from

    def set_city_to(self, city_to):
        self.city_to = city_to

    # accelerometer
    def set_x_acceleration(self, x_acceleration):
        self.x_acceleration = x_acceleration

    def set_y_acceleration(self, y_acceleration):
       self.y_acceleration = y_acceleration

    def set_z_acceleration(self, z_acceleration):
        self.z_acceleration = z_acceleration

    # hyroscope
    def set_x_orientation(self, x_orientation):
       self.x_orientation = x_orientation

    def set_y_orientation(self, y_orientation):
        self.y_orientation = y_orientation

    def set_z_orientation(self, z_orientation):
        self.z_orientation = z_orientation

    def set_doors_open(self, doors_open):
        self.doors_open = doors_open

    def set_longitude(self, longitude):
        self.longitude = longitude

    def set_latitude(self, latitude):
        self.latitude = latitude

    def acquire_telemetry(self):
        self.set_x_acceleration(0)
        self.set_y_acceleration(0)
        self.set_z_acceleration(9.8)

        self.set_x_orientation(0)
        self.set_y_orientation(0)
        self.set_z_orientation(0)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)