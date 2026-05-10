import api from "../../Config/api";
import {
     CREATE_BOOKING_REQUEST,
     CREATE_BOOKING_SUCCESS,
     FETCH_BOOKING_BY_ID_FAILURE,
     FETCH_BOOKING_BY_ID_REQUEST,
     FETCH_BOOKING_BY_ID_SUCCESS,
     FETCH_CUSTOMER_BOOKINGS_FAILURE,
     FETCH_CUSTOMER_BOOKINGS_REQUEST,
     FETCH_CUSTOMER_BOOKINGS_SUCCESS,
     FETCH_SALON_BOOKINGS_FAILURE,
     FETCH_SALON_BOOKINGS_REQUEST,
     FETCH_SALON_BOOKINGS_SUCCESS,
     GET_SALON_REPORTS_FAILURE,
     GET_SALON_REPORTS_REQUEST,
     GET_SALON_REPORTS_SUCCESS,
     UPDATE_BOOKING_STATUS_FAILURE,
     UPDATE_BOOKING_STATUS_REQUEST,
     UPDATE_BOOKING_STATUS_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "/api/bookings";
export const createBooking =
     ({jwt, salonId, bookingData}) =>
     async (dispatch) => {
          dispatch({type: CREATE_BOOKING_REQUEST});
          console.log("bookingData", bookingData);
          console.log("jwt", jwt);
          console.log("salonId", salonId);
          try {
               const {data} = await api.post(API_BASE_URL, bookingData, {
                    headers: {Authorization: `Bearer ${jwt}`},
                    params: {salonId, paymentMethod: "RAZORPAY"},
               });
               window.location.href = data.payment_link_url;
               dispatch({type: CREATE_BOOKING_SUCCESS, payload: data});
          } catch (error) {
               dispatch({type: CREATE_BOOKING_FAILURE, payload: error.response?.data?.message || error.message});
          }
     };

export const fetchCustomerBookings = (jwt) => async (dispatch) => {
     dispatch({type: FETCH_CUSTOMER_BOOKINGS_REQUEST});
     try {
          const {data} = await api.get(`${API_BASE_URL}/customer`, {
               headers: {Authorization: `Bearer ${jwt}`},
          });
          dispatch({type: FETCH_CUSTOMER_BOOKINGS_SUCCESS, payload: data});
     } catch (error) {
          dispatch({type: FETCH_CUSTOMER_BOOKINGS_FAILURE, payload: error.message});
     }
};

export const fetchSalonBookings =
     ({jwt}) =>
     async (dispatch) => {
          dispatch({type: FETCH_SALON_BOOKINGS_REQUEST});
          try {
               const {data} = await api.get(`${API_BASE_URL}/salon`, {
                    headers: {Authorization: `Bearer ${jwt}`},
               });
               dispatch({type: FETCH_SALON_BOOKINGS_SUCCESS, payload: data});
          } catch (error) {
               dispatch({type: FETCH_SALON_BOOKINGS_FAILURE, payload: error.message});
          }
     };

export const fetchBookingById = (bookingId) => async (dispatch) => {
     dispatch({type: FETCH_BOOKING_BY_ID_REQUEST});
     try {
          const {data} = await api.get(`${API_BASE_URL}/${bookingId}`);
          dispatch({type: FETCH_BOOKING_BY_ID_SUCCESS, payload: data});
     } catch (error) {
          dispatch({type: FETCH_BOOKING_BY_ID_FAILURE, payload: error.message});
     }
};

export const updateBookingStatus =
     ({bookingId, status, jwt}) =>
     async (dispatch) => {
          dispatch({type: UPDATE_BOOKING_STATUS_REQUEST});
          try {
               const {data} = await api.put(`${API_BASE_URL}/${bookingId}/status`, null, {
                    headers: {Authorization: `Bearer ${jwt}`},
                    params: {status},
               });
               dispatch({type: UPDATE_BOOKING_STATUS_SUCCESS, payload: data});
          } catch (error) {
               dispatch({type: UPDATE_BOOKING_STATUS_FAILURE, payload: error.message});
          }
     };

export const getSalonReport = (jwt) => async (dispatch) => {
     dispatch({type: GET_SALON_REPORTS_REQUEST});
     try {
          const response = await api.get("/api/bookings/report", {
               headers: {Authorization: `Bearer ${jwt}`},
          });
          dispatch({type: GET_SALON_REPORTS_SUCCESS, payload: response.data});
     } catch (error) {
          dispatch({
               type: GET_SALON_REPORTS_FAILURE,
               payload: error.response ? error.response.data : error.message,
          });
     }
};
