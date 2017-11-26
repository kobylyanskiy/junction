import sqlalchemy

from sqlalchemy import func, text, select, or_


class Database:

    def __init__(self, dbname='postgres', user='postgres', host='localhost', password='pass', port=5432):
        url = 'postgresql://{}:{}@{}:{}/{}'
        url = url.format(user, password, host, port, dbname)
        self.con = sqlalchemy.create_engine(url, client_encoding='utf8')
        self.meta = sqlalchemy.MetaData(bind=self.con, reflect=True)

    def create_warehouse(self, longitude, latitude, capacity=88, cost_of_service=5000):
        clause = self.meta.tables['warehouses'].insert().values(
            longitude=longitude, latitude=latitude, capacity=capacity, cost_of_service=cost_of_service)
        self.con.execute(clause)

    def create_city(self, name, longitude, latitude, population, country, port_id, warehouse_id):
        clause = self.meta.tables['cities'].insert().values(
            name=name, longitude=longitude, latitude=latitude, population=population,
            country=country, port_id=port_id, warehouse_id=warehouse_id)
        self.con.execute(clause)

    def create_port(self, port_id, cost_of_shipping_to_us=400, cost_of_shipping_to_china=500):
        clause = self.meta.tables['ports'].insert().\
            values(port_id=port_id, cost_of_shipping_to_us=cost_of_shipping_to_us,
                   cost_of_shipping_to_china=cost_of_shipping_to_china)
        self.con.execute(clause)

    def create_road(self, from_city_id, to_city_id, duration, distance):
        clause = self.meta.tables['roads'].insert(). \
            values(from_city_id=from_city_id, to_city_id=to_city_id,
                   duration=duration, distance=distance)
        self.con.execute(clause)

    def get_truck(self, name, cost):
        return self.con.execute(
            text("SELECT get_truck(('{}', {}))".
                 format(name, cost)).execution_options(autocommit=True)).fetchall()

    def read_city(self, city_id):
        cities = self.meta.tables['cities']
        clause = cities.select().where(cities.c.city_id == city_id)
        return self.con.execute(clause)

    def update_city(self, city_id, name, longitude, latitude, population, country, port_id, warehouse_id):
        clause = self.meta.tables['cities'].update().values(
            name=name, longitude=longitude, latitude=latitude, population=population,
            country=country, port_id=port_id, warehouse_id=warehouse_id).where(
            self.meta.tables['cities'].c.city_id == city_id)
        self.con.execute(clause)

    def delete_factory(self, factory_id):
        factories = self.meta.tables['factories']
        clause = factories.delete().where(factories.c.factory_id == factory_id)
        self.con.execute(clause)

    def read_warehouse(self, warehouse_id):
        warehouses = self.meta.tables['warehouses']
        clause = warehouses.select().where(warehouses.c.warehouse_id == warehouse_id)
        return self.con.execute(clause)

    def read_road(self, from_city, to_city):
        roads = self.meta.tables['roads']
        clause = roads.select().where(roads.c.from_city_id == from_city).where(roads.c.to_city_id == to_city)
        return self.con.execute(clause)

    def update(self):
        pass

    def delete(self):
        pass
