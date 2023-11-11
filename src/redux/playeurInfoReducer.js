import { SET_PLAYEUR_INFO } from "./actions";

const initialState = {
    name: '',
    email: '',
    phone: '',
    level: 0,
    birthDay: '',
    inscriptions: []
}

const playeurInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PLAYEUR_INFO: 
        return {
            ...state,
            ...action.payload
        };
        default: {
            return state
        }
    }
}

export default playeurInfoReducer;