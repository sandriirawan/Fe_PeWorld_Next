const initialState = {
    perekrut: [],
    perekrutDetail: [],
  };
  
  const perekrutReducer = (state = initialState, action) => {
    if (action.type === "GET_ALL_PEREKRUT") {
      return {
        ...state,
        perekrut: action.payload,
      };
    } else if (action.type === "GET_DETAIL_PEREKRUT") {
      return {
        ...state,
        perekrutDetail: [action.payload],
      };
    } else if (action.type === "UPDATE_PEREKRUT") {
      return state;
    } else {
      return state;
    }
  };
  
  export default perekrutReducer;
    