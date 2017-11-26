import csv
from database.database import Database
from warehouse.warehouses import Warehouses
from roads.roads import Road


class CSVFile:

    european_countries = {
        'Austria', 'Belgium', 'Cyprus',
        'Czech Republic', 'Denmark'
        'Estonia', 'Finland', 'France',
        'Germany', 'United Kingdom',
        'Greece', 'Hungary', 'Iceland',
        'Ireland', 'Italy', 'Latvia',
        'Lithuania', 'Luxembourg',
        'Netherlands', 'Norway',
        'Poland', 'Portugal', 'Romania',
        'Slovakia', 'Slovenia', 'Spain',
        'Sweden', 'Switzerland'
    }

    warehouses_coordinates = [
        [0.13228448, 48.85994964],
        [18.48496156, 52.20984462],
        [-7.18939865, 39.78374935],
        [19.62894233, 47.29642355],
        [15.36270296, 58.52179392],
        [13.20315229, 42.27914382],
        [25.9421426, 63.04870051],
        [-21.89500161, 64.13499892],
        [23.08940411, 38.86321707],
        [-0.49323907, 42.07350876],
        [9.10364119, 60.43317088],
        [-3.96711745, 53.98328821],
        [8.05582837, 46.8705798],
        [25.63603837, 45.662058],
        [-18.54521292, 31.75204049],
        [19.24317809, 66.85311598],
        [33.29261738, 34.99216804],
        [14.14465129, 50.40191986],
        [22.32304144, 51.99307471],
        [6.09146493, 51.39510866]
    ]

    def __init__(self, filename):
        self.database = Database()

    def read(self):
        with open('/home/kirill/Desktop/World_Cities.csv') as input_file:
            content = csv.reader(input_file, delimiter=',')
            for row in content:
                if row[8] in CSVFile.european_countries:
                    print("{}, {}".format(row[4], row[8]))
                    print("Longitude: {}".format(row[0]))
                    print("Latitude: {}".format(row[1]))
                    print("Population: {} peoples".format(row[10]))
                    print("Port id: {}\n".format(row[13]))
                    self.database.insert_city(row[4], row[10], row[0], row[1], row[8], row[13])
        self.database.conn.commit()

    @staticmethod
    def write(reader, filename):
        out_file = open(filename, "wb")
        writer = csv.writer(out_file, delimiter='', quotechar='"', quoting=csv.QUOTE_ALL)
        for row in reader:
            writer.writerow(row)
        out_file.close()


def create_warehouses(centroids, db):
    for warehouse in centroids.tolist():
        db.create_warehouse(warehouse[0], warehouse[1])


def create_cities(labels, europec, db):
    for warehouse_id, city in zip(labels, europec.values):
        longitude = float(city[1])
        latitude = float(city[2])
        population = int(city[11])
        name = city[5]
        country = city[9]
        port_id = int(city[14])
        if port_id is not 0:
            db.create_port(port_id)
        else:
            port_id = None
        db.create_city(name, longitude, latitude, population, country, port_id, int(warehouse_id))


def create_roads(db):
    for city_id in range(0, 401):
        for row in db.read_city(city_id):
            longitude_to = row[4]
            latitude_to = row[3]
            warehouse_id = row[6]
            print('iteration {}'.format(city_id))
            print('city {}'.format(row[1]))
            print('warehouse {}'.format(warehouse_id))
            for inner_row in db.read_warehouse(warehouse_id):
                longitude_from = inner_row[1]
                latitude_from = inner_row[2]

                create_road = False
                try:
                    road = db.read_road(warehouse_id, city_id).fetchone()
                    if road is None:
                        create_road = True
                        print('NEW ROAD, city id is {}'.format(city_id))
                except TypeError:
                    print('NEW ROAD, city id is {}'.format(city_id))
                    create_road = True

                if create_road:
                    try:
                        duration, distance = Road.find_road(longitude_from, latitude_from, longitude_to, latitude_to)
                    except Exception as e:
                        print(e)
                        break

                    print('from ({};{}) to ({};{})\nDistance: {}\n Duration: {}'.
                          format(longitude_from, latitude_from, longitude_to, latitude_to, duration, distance))
                    db.create_road(warehouse_id, city_id, duration, distance)


if __name__ == "__main__":
    db = Database()
    warehouses = Warehouses()
    centroids, labels, europec = warehouses.get_warehouses('World_Cities.csv', 16)
    create_warehouses(centroids, db)
    create_cities(labels, europec, db)
    for i in range(0, 50):
        create_roads(db)
