import { combineReducers } from "redux";
import pekerjaReducer from "./pekerja";
import perekrutReducer from "./perekrut";



const rootReducer = combineReducers({
    pekerja : pekerjaReducer,
    perekrut: perekrutReducer,

    

})

export default rootReducer;