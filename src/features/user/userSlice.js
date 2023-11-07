import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import toast from "react-hot-toast";

const initialState = {
  username: "",
  address: "",
  loading: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getname(state, action) {
      state.username = action.payload;
    },
    position(state, action) {
      state.address = action.payload;
      state.loading = false;
    },
    loading(state) {
      state.loading = true;
    },
  },
});

const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const fetchAddress = () => {
  return async function (dispatch) {
    try {
      dispatch({ type: "user/loading" });

      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      dispatch({ type: "user/position", payload: address });
    } catch (err) {
      toast.error(err.message);
    }
  };
};

export const { getname, position } = userSlice.actions;
export const getUser = (state) => state.user;

export default userSlice.reducer;
