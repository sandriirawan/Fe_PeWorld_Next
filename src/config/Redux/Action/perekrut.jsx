import axios from "axios";
import Cookies from "js-cookie";


export function getDetailPerekrut() {
  return async (dispatch) => {
    try {
      const userId = Cookies.get("id");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/perekrut/profile/${userId}`
      );
      const result = response.data.data[0];
      dispatch({ type: "GET_DETAIL_PEREKRUT", payload: result });
    } catch (error) {
      console.error("Error fetching perekrut detail:", error);
    }
  };
}