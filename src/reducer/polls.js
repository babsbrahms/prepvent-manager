import { } from '../types';


let init = [
    {
        title: "food",
        question: "Choose a food",
        options: {
            'Fried Rice': 0,
            'Amala': 0,
            "Beans": 0
        }
    },
    {
        title: "color",
        question: "Choose a color",
        options: {
            'Red': 0,
            'Blue': 0,
            "Green": 0
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