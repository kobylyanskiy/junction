import { checkHttpStatus, parseJSON } from '../utils';

export function createNewOrder(order) {
    return fetch('http://10.100.9.134:5000/create_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(checkHttpStatus);
}

export function createNewHub(hub) {
    return fetch('http://10.100.9.134:5000/create_hub', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hub)
    })
        .then(checkHttpStatus);
}

export function addNewTrack() {
    return fetch('http://10.100.9.134:5000/add_trailer', {
        method: 'GET'
    })
        .then(checkHttpStatus);
}

export function getTrackPosition1() {
    return fetch('http://10.100.9.134:5000/get_trailers', {
        method: 'GET'
    })
        .then(checkHttpStatus)
        .then(parseJSON);
}