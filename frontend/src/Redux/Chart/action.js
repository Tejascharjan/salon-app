
import { FETCH_BOOKINGS_FAILURE, FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, FETCH_EARNINGS_FAILURE, FETCH_EARNINGS_REQUEST, FETCH_EARNINGS_SUCCESS } from "./actionTypes"
import api from "../../Config/api";

const API_BASE_URL = "/api/bookings/chart";

export const fetchEarnings = (token) => async (dispatch) => {
    dispatch({ type: FETCH_EARNINGS_REQUEST });
    try {
        const response = await api.get(`${API_BASE_URL}/earnings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        dispatch({ type: FETCH_EARNINGS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_EARNINGS_FAILURE, payload: error.response?.data || error.message });
    }
}

export const fetchBookings = (token) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST })
    try {
        const response = await api.get(`${API_BASE_URL}/bookings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_BOOKINGS_FAILURE, payload: error.response?.data || error.message });
    }

}