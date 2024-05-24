import { SET_PLAYEUR_INFO } from "../actions";

const initialState = {
  name: "",
  level: null,
  formule: "1h par semaine",
};

const playeurInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYEUR_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

export default playeurInfoReducer;
