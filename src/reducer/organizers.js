import { } from '../types';

let init = [
    { name: "olayinka ibrahim", email: "ib@gmail.com", uid: "1" },
    { name: "Teslim", email: "tessy@gmail.com", uid: "2" },
    { name: "Najeeb", email: "baz@gmail.com", uid: "3" },
    { name: "Zharadeen", email: "zhara@gmail.com", uid: "4" },
    { name: "biola", email: "biol@gmail.com", uid: "5" },
    { name: "Teslim", email: "Tessy@gmail.com", uid: "6" },
];

function organizerReducer (state = init, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default organizerReducer;