import { } from '../types';

let init = {
    name: "PrepVENT Launch Party",
    poster: null,
    date: new Date(),
    location: "",
    state: "",
    country: "",
    budget: 500,
    invitation: "",
    host: "",
    polls: [],
    contact: "",
    checkin: false,
    checkinRule: 'accepted',
    tableChartRule: 'accepted',
    acceptanceDeadline: "",
    expenditure: 200,
    invited: 200,
    accepted: 180,
    checkedIn: 150,
    organizers: 4,
    user: {
        name: "",
        uid: ''
    }
};

function eventReducer (state = init, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default eventReducer;