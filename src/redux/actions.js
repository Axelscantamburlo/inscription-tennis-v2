
export const SET_PLAYEUR_INFO = 'SET_PLAYEUR_INFO'
export const SET_SELECT_SCHEDULE = 'SET_SELECT_SCHEDULE'
export const FETCH_INITIAL_DATA = "FETCH_INITIAL_DATA";


export const setPlayeurInfo = (info) => (dispatch) =>  {
    dispatch ({
        type: SET_PLAYEUR_INFO,
        payload: info,
    });
}

export const selectSchedule = (schedule, path) => (dispatch) => {
    dispatch ({
      type: SET_SELECT_SCHEDULE,
      payload: schedule,
      path: path
  });
  };
