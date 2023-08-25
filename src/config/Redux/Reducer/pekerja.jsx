const initialState = {
  pekerja: [],
  pekerjaDetail: [],
};

const pekerjaReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_PEKERJA") {
    return {
      ...state,
      pekerja: action.payload,
    };
  } else if (action.type === "GET_DETAIL_PEKERJA") {
    return {
      ...state,
      pekerjaDetail: [action.payload],
    };
  } else if (action.type === "UPDATE_PEKERJA") {
    return state;
  } else {
    return state;
  }
};

export default pekerjaReducer;
  