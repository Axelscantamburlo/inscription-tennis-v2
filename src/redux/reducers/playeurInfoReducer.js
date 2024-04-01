import { SET_PLAYEUR_INFO } from "../actions";

const initialState = {
    name: '',
    email: '',
    phone: '',
    level: 0,
    birthDay: '',
    sexe: '',
    formule: '',
    job: '',
    nationality: '',
    adress: ''
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