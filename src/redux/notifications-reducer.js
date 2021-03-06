import {v4} from 'uuid';

const SHOW_NOTIFY = 'NOTIFICATIONS/SHOW_NOTIFY';
const REMOVE_NOTIFY = 'NOTIFICATIONS/REMOVE_NOTIFY';

let initialState = [

];

export const createNotification = (msg, status, auto_close = true) => {
    return {
        type: SHOW_NOTIFY,
        text: msg,
        status: status,
        auto_close: auto_close
    }
}

export const removeNotification= (id) => {
    return {
        type: REMOVE_NOTIFY,
        id: id
    }
}

export const notificationsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_NOTIFY:
            return [
                ...state,
                {
                    text: action.text,
                    status: action.status,
                    id: v4(),
                    auto_close: action.auto_close
                }
            ]

        case REMOVE_NOTIFY:
            return  state.filter(n =>  n.id !== action.id);

        default: 
            return state;
    }
}

export default notificationsReducer;