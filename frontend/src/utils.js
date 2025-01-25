import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function notifyOK(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'green'
        }
    }).showToast();
}


export function notifyKO(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'red'
        }
    }).showToast();
}