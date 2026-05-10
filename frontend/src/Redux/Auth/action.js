import api, {API_BASE_URL} from "../../Config/api";
import {
     GET_ALL_CUSTOMERS_FAILURE,
     GET_ALL_CUSTOMERS_REQUEST,
     GET_ALL_CUSTOMERS_SUCCESS,
     GET_UER_REQUEST,
     GET_USER_FAILURE,
     GET_USER_SUCCESS,
     LOGIN_FAILURE,
     LOGIN_REQUEST,
     LOGIN_SUCCESS,
     LOGOUT,
     REGISTER_FAILURE,
     REGISTER_REQUEST,
     REGISTER_SUCCESS,
} from "./actionTypes";

export const registerUser = (userData) => async (dispatch) => {
     dispatch({type: REGISTER_REQUEST});
     try {
          const response = await api.post(`${API_BASE_URL}/auth/signup`, userData.userData);
          const user = response.data;
          if (user?.jwt) {
               localStorage.setItem("jwt", user.jwt);
               userData.navigate("/");
          }
          dispatch({type: REGISTER_SUCCESS, payload: user});
     } catch (error) {
          dispatch({type: REGISTER_FAILURE, payload: error.message});
     }
};

export const loginUser = (userData) => async (dispatch) => {
     dispatch({type: LOGIN_REQUEST});
     try {
          const response = await api.post(`${API_BASE_URL}/auth/login`, userData.data);
          const user = response.data;
          if (user?.jwt) {
               localStorage.setItem("jwt", user.jwt);
               if (user?.role === "ROLE_ADMIN") {
                    userData.navigate("/admin");
               } else if (user?.role === "ROLE_SALON_OWNER") {
                    userData.navigate("/salon-dashboard");
               } else {
                    userData.navigate("/");
               }
          }
          dispatch({type: LOGIN_SUCCESS, payload: user});
     } catch (error) {
          dispatch({type: LOGIN_FAILURE, payload: error.message});
     }
};

export const getAllCustomers = (token) => async (dispatch) => {
     dispatch({type: GET_ALL_CUSTOMERS_REQUEST});
     try {
          const response = await api.get(`${API_BASE_URL}/api/admin/users`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          const users = response.data;
          dispatch({type: GET_ALL_CUSTOMERS_SUCCESS, payload: users});
     } catch (error) {
          dispatch({type: GET_ALL_CUSTOMERS_FAILURE, payload: error.message});
     }
};

export const getUser = (token) => async (dispatch) => {
     dispatch({type: GET_UER_REQUEST});
     try {
          const response = await api.get(`${API_BASE_URL}/api/users/profile`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          const user = response.data;
          dispatch({type: GET_USER_SUCCESS, payload: user});
     } catch (error) {
          dispatch({type: GET_USER_FAILURE, payload: error.message});
     }
};

export const logout = () => async (dispatch) => {
     localStorage.removeItem("jwt");
     localStorage.removeItem("user");
     dispatch({type: LOGOUT});
};
