import { } from '../types';


let init = [
    {
        uid: '123',
        title: "food",
        question: "Choose a food",
        options: {
            'Fried Rice': 7,
            'Amala': 1,
            "Beans": 2
        }
    },
    {
        uid: '233',
        title: "color",
        question: "Choose a color",
        options: {
            'Red': 10,
            'Blue': 12,
            "Green": 20
        } 
    }
];


function pollsReducer (state = init, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default pollsReducer;