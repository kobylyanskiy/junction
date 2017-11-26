from web3 import Web3, HTTPProvider, IPCProvider
import json

class Transaction:
    def __init__(self, owner='0x95C75643D98552fce534FCfAE40f20fB503b6210',
                 customer='0x32C76a22100DAc2a51f799f625Ef3e51Dd695729',
                 contract='0x0FfE166a0d4948fF9B66ffC46b299B78560f5ab1'):
        self.owner = owner
        self.customer = customer
        self.contract_t = contract

        self.payed = False
        self.order_placed = False

        self.w3 = Web3(HTTPProvider('http://10.100.16.83:8545'))
        # print(get_current_balance(w3, '0x96bda6799Bd16b163554cBfc07741C6970180BAE'))


        self.abi = json.loads('[ { "constant": false, "inputs": [ { "name": "_orderNumber", "type": "uint256" } ], "name": "trackEnd", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "orders", "outputs": [ { "name": "customer", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "cost", "type": "uint256", "value": "0" }, { "name": "state", "type": "uint8", "value": "0" }, { "name": "punishment", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_customer", "type": "address" }, { "name": "_orderNumber", "type": "uint256" }, { "name": "_cost", "type": "uint256" } ], "name": "newOrder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_orderNumber", "type": "uint256" }, { "name": "_punishment", "type": "uint256" } ], "name": "punish", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_orderNumber", "type": "uint256" } ], "name": "trackStart", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Payment", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "orderNumber", "type": "uint256" } ], "name": "OrderIsCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderNumber", "type": "uint256" } ], "name": "TrackStart", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderNumber", "type": "uint256" }, { "indexed": false, "name": "punishment", "type": "uint256" } ], "name": "Punish", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderNumber", "type": "uint256" } ], "name": "TrackEnd", "type": "event" } ]')
        # self.abi = json.loads('[ { "constant": false, "inputs": [ { "name": "_orderNumber", "type": "uint256" } ], "name": "trackEnd", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "orders", "outputs": [ { "name": "customer", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "cost", "type": "uint256", "value": "0" }, { "name": "state", "type": "uint8", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_customer", "type": "address" }, { "name": "_orderNumber", "type": "uint256" }, { "name": "_cost", "type": "uint256" } ], "name": "newOrder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_orderNumber", "type": "uint256" } ], "name": "trackStart", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Payment", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "orderNumber", "type": "uint256" } ], "name": "OrderIsCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderNumber", "type": "uint256" } ], "name": "TrackStart", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderNumber", "type": "uint256" } ], "name": "TrackEnd", "type": "event" } ]')
        self.contract = self.w3.eth.contract(self.abi, self.contract_t)

        self.contract.on('Payment', {}, self.transfer_callback)

        self.transaction = {
            'to':self.contract_t,
            'from':self.customer,
            'value': 1000000
        }

        print('MAKING TRANSACTION')
        print(self.make_transaction())
        print('PAYMENT IS COMPLETED')

    def make_transaction(self):
        # abi = json.loads('[{"constant":false,"inputs":[{"name":"_orderNumber","type":"uint256"}],"name":"trackEnd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"customer","type":"address"},{"name":"cost","type":"uint256"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_customer","type":"address"},{"name":"_orderNumber","type":"uint256"},{"name":"_cost","type":"uint256"}],"name":"newOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderNumber","type":"uint256"}],"name":"trackStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Payment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"orderNumber","type":"uint256"}],"name":"OrderIsCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"orderNumber","type":"uint256"}],"name":"TrackStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"orderNumber","type":"uint256"}],"name":"TrackEnd","type":"event"}]')
        print(self.w3.personal.unlockAccount(self.customer, '2'))
        transaction_id = self.w3.eth.sendTransaction(self.transaction)
        return transaction_id

    def transfer_callback(self, log_entry):
        # owner = '0x643D729C81CdCD4E3F882cBEd129aeE3741C3dE6'

        self.payed = True

        self.w3.personal.unlockAccount(self.owner, '1')

        transaction_t = {
            'to':self.contract_t,
            'from':self.owner
        }
        self.contract.transact(transaction_t).newOrder(self.customer, 1, 2)
        print(log_entry)
        print('ORDER IS PLACED')
        self.order_placed = True
        self.contract.transact(transaction_t).trackStart(1)




def get_current_balance(w3, user):
    wei_balance = w3.eth.getBalance(user)
    ether_balance = Web3.fromWei(wei_balance, unit='ether')
    return ether_balance









# print(w3.eth.accounts)
# print(w3.eth.contract("0xe0B1e9613203E7d572fd255D90acA0Fb70DeC262").address)



# print(get_current_balance(w3, '0x96bda6799Bd16b163554cBfc07741C6970180BAE'))
# print(make_transaction(w3, transaction))
