import json
from time import sleep


def toJSON(object):
    return json.dumps(object, default=lambda o: o.__dict__,
                      sort_keys=True, indent=4)


def simulate_data(trailers, dataset):
    filename = '/home/kirill/Documents/ifmo/modelling/modelbox/data_{}.json'.format(dataset)
    with open(filename) as f:
        lines = f.readlines()
        for line in lines:
            data = json.loads(line)

            rfid = data['rfid']
            trailers[0].rfid = rfid

            city_from = data['city_from']
            city_to = data['city_to']

            trailers[0].set_city_to(city_to)
            trailers[0].set_city_from(city_from)


            x_accel = data['trail_accelerationX']
            y_accel = data['trail_accelerationX']
            z_accel = data['trail_accelerationX']

                # print('x: {}'.format(x_accel))
                # print('y: {}'.format(y_accel))
                # print('z: {}'.format(z_accel))

            trailers[0].set_x_acceleration(x_accel)
            trailers[0].set_y_acceleration(y_accel)
            trailers[0].set_z_acceleration(z_accel)

            trailers[0].status = 'IN PROGRESS'

            x_gyro = data['trail_gyroscopeX']
            y_gyro = data['trail_gyroscopeY']
            z_gyro = data['trail_gyroscopeZ']

                # print('x: {}'.format(x_gyro))
                # print('y: {}'.format(y_gyro))
                # print('z: {}'.format(z_gyro))

            trailers[0].set_x_orientation(x_gyro)
            trailers[0].set_y_orientation(y_gyro)
            trailers[0].set_z_orientation(z_gyro)

            lon = data['lon']
            trailers[0].longitude = lon

            lat = data['lat']
            trailers[0].latitude = lat

            temperature = data['temperature']
            trailers[0].temperature = temperature

            doors_open = data['open_traile']
            trailers[0].doors_open = doors_open

            # print(toJSON(trailers))
            # print('____________________________________________________________________')
            sleep(1)
