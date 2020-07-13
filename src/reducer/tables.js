import { } from '../types';

let init = [
    { name: 'Table 1', uid: "121"}, 
    { name: 'Bride Table', uid: "121qwq"},
    { name: "Children's Table", uid: "121ert"}
];

function tablesReducer (state = init, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default tablesReducer;