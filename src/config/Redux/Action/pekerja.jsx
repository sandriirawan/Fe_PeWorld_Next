import axios from "axios";
import Cookies from "js-cookie";


export function getDetailPekerja() {
  return async (dispatch) => {
    try {
      const userId = Cookies.get("id");
      const response = await axios.get(
        `https://be-peworld.vercel.app/pekerja/profile/${userId}`
      );
      const result = response.data.data[0];
      dispatch({ type: "GET_DETAIL_PEKERJA", payload: result });
    } catch (error) {
      console.error("Error fetching pekerja detail:", error);
    }
  };
}


