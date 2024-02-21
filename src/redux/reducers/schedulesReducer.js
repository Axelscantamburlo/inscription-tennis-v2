import { SET_SELECT_SCHEDULE } from "../actions";
const initialStatee = {
    selectedScheduleFirst: null,
    selectedScheduleSecond: null,
    selectedScheduleThird: null
  };

  
  const schedulesReducer = (state = initialStatee, action) => {
   
    switch (action.type) {

      case SET_SELECT_SCHEDULE:

        const {path, payload} = action
        return {
          ...state,
          [`selectedSchedule${path}`]: payload,
        };
        
      default:
        return state;
    }
  };
  
  export default schedulesReducer;