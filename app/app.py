import json
import random

from flask_cors import CORS
from threading import Thread
from time import sleep
from flask import Flask
from flask import request
from flask.views import MethodView
from flask import render_template
from roads.roads import Road
from trailer.trailer import Trailer
from data.parse_data import simulate_data
from contract.contract import Transaction


class Hub():
    def __init__(self, name, lon, lat):
        self.name = name
        self.lon = lon
        self.lat = lat

hubs = []


class HubRequest(MethodView):
    def get(self):
        return render_template("index.html")

    def post(self):
        form = request.form
        # name = request.form.get('value')
        # dict = form.to_dict(flat=False)

        # print(dict[dict.keys()[0]])
        # print(form)

        # name = dict['name']
        # lon = dict['lon']
        # lat = dict['lon']
        content = request.get_json()

        hubs.append(content)


        name = content['name']
        print(name)

        lon = content['position']['lng']
        lat = content['position']['lat']

        print(lon, lat)



        # print(content)
        # print('dict is {}'.format(dict))
        # print('name is {}, lon is {}, lat is {}'.format(name, lon, lat))

        # print(form)

        return 'HUB is added'

requests = []


class GenericRequest(MethodView):
    def get(self):
        name = request.args.get('name', 'Damyan')
        return 'Hello GET from {}'.format(name)

    def post(self):
        form = request.form
        # name = request.form.get('value')

        content = request.get_json()
        requests.append(content)


        print('value is {}'.format(form.to_dict(flat=False)))
        print(form)


        print('CREATE CONTRACT')
        add_contract()

        return 'Hello POST from {}'.format(form.to_dict())



class Application:
    truck_id = 0

    def __init__(self):
        self.app = Flask(__name__)
        self.add_routing()
        truck_id = 0

    def index(self):
        return render_template("index.html")

    def configure(self):
        return render_template("configure.html")

    def get_contracts(self):
        return toJSON(trailers)

    def get_hubs(self):
        return toJSON(hubs)

    def get_orders(self):
        return toJSON(orders)

    def add_routing(self):
        self.add_endpoint(endpoint='/get_route/<longitude_from>/<latitude_from>/<longitude_to>/<latitude_to>',
                          endpoint_name='main', handler=Road.get_duration_and_distance)

        self.add_endpoint(endpoint='/index',
                          endpoint_name='index', handler=self.index)

        self.add_endpoint(endpoint='/configure',
                          endpoint_name='configure', handler=self.configure)

        self.add_endpoint(endpoint='/get_trailers', endpoint_name='get_trailers', handler=self.get_contracts)

        self.add_endpoint(endpoint='/get_hubs', endpoint_name='get_hubs', handler=self.get_hubs)

        self.add_endpoint(endpoint='/get_orders', endpoint_name='get_orders', handler=self.get_orders)

        self.add_endpoint(endpoint='/add_trailer', endpoint_name='add_trailer', handler=generate_trailer)

        # self.add_url_rule('/users/', view_func=self.add_contract, methods=['POST', ])

        self.app.add_url_rule(
            '/create_order',
            view_func=GenericRequest.as_view('create_order')
        )

        self.app.add_url_rule(
            '/create_hub',
            view_func=HubRequest.as_view('create_hub')
        )

    def add_contract(self):
        pass

    def run(self):
        cors = CORS(self.app)
        self.app.run(host='0.0.0.0')

    def add_endpoint(self, endpoint=None, endpoint_name=None, handler=None):
        self.app.add_url_rule(endpoint, endpoint_name, handler)


def toJSON(object):
    return json.dumps(object, default=lambda o: o.__dict__,
                      sort_keys=True, indent=4)


transactions = []
truck_id = 0


def add_contract():
    print('WAITING FOR PAYMENT')
    # wait until transaction is done
    transaction = Transaction()
    transactions.append(transaction)
    print('CREATED TRANSACTION')

    while transaction.order_placed is False:
        continue
    generate_trailer()
    print('EXITING ADD_CONTRACT')


def generate_trailer():
    Application.truck_id += 1
    add_trailer(Application.truck_id, 'ADDED', 0, 45.2, 23.4)
    return 'OK'


def add_trailer(id, status, rfid, longitude, latitude):
    trailer = Trailer(id, status, rfid, longitude, latitude)
    trailer.acquire_telemetry()
    trailer.set_doors_open('closed')
    trailers.append(trailer)

    print('ADD TRAILER')
    sleep(1)

    dataset = 'trailers'

    generate_data = Thread(target=simulate_data, args=(trailers, dataset))
    generate_data.start()


def monitor(number_of_trailer):
    while True:
        # print('check trailer {}'.format(number_of_trailer))
        if len(trailers) is 0:
            print('There is no trucks yet')
            continue
        rfid = trailers[0].rfid
        temperature = trailers[0].temperature
        # print("RFID is {}".format(rfid))
        if rfid > 50:
            print('TRUCK IS DONE')
            transaction = transactions[0]
            transaction_t = {
                'to': transaction.contract_t,
                'from': transaction.owner
            }
            transaction.contract.transact(transaction_t).trackEnd(1)
            print('END TRANSACTION')

        print(temperature)
        if temperature is not None:
            print(float(temperature))
            if float(temperature) > 17.0:
                transaction = transactions[0]
                transaction_t = {
                    'to': transaction.contract_t,
                    'from': transaction.owner
                }
                print('THERE IS A FEE')
                transaction.contract.transact(transaction_t).punish(1, 1)

        sleep(1)


trailers = []
orders = []
hubs = []

if __name__ == "__main__":
    app = Application()
    app.run()

    thread = Thread(target=monitor, args=(1,))
    thread.start()
