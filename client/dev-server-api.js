var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + '-' + s4() ;
}

function getTransportationCatalog(req, res) {
    var json = [
        {
            "city_from": "Essen",
            "city_to": "Dortmund",
            "doors_open": "closed",
            "id": "123",
            "latitude": 23.4,
            "longitude": 45.2,
            "rfid": 1234,
            "status": "ADDED",
            "x_acceleration": 0,
            "x_orientation": 0,
            "y_acceleration": 0,
            "y_orientation": 0,
            "z_acceleration": 9.8,
            "z_orientation": 0
        }, {
            "city_from": "Essen",
            "city_to": "Dortmund",
            "doors_open": "closed",
            "id": "1234",
            "latitude": 23.4,
            "longitude": 45.2,
            "rfid": 1234,
            "status": "ADDED1",
            "x_acceleration": 0,
            "x_orientation": 0,
            "y_acceleration": 0,
            "y_orientation": 0,
            "z_acceleration": 9.8,
            "z_orientation": 0
        } ];
    var status = ['ADDED', 'NOTADDED'];
    var catalog = (new Array(100)).fill(0).map((_, index) => {
        return {
            id: guid(),
            status: status[index % 2]
        }
    })
    res.json(catalog);
}

function sendIndex(req, res) {
    res.sendFile(path.join(__dirname, '..', 'app', 'templates', 'index.html'))
}

function serverApi(app) {
    // see details here http://expressjs.com/en/4x/api.html#app.get
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.all('*', (req, res, next) => {
        console.info('url', req.url);
        console.info('body', req.body);
        next();
    })
    app.get('/get_trailers', getTransportationCatalog);
    app.get('/create_order', sendIndex);
    app.get('/create_hub', sendIndex);
    app.get('/order/*', sendIndex);

    app.post('/create_order', (req, res) => {
        res.json({ok: true});
    });
    app.post('/create_hub', (req, res) => {
        res.json({ok: true});
    });
}

module.exports = serverApi;