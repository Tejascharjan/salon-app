import {
     CREATE_SERVICE_FAILURE,
     CREATE_SERVICE_REQUEST,
     CREATE_SERVICE_SUCCESS,
     FETCH_SERVICE_BY_ID_FAILURE,
     FETCH_SERVICE_BY_ID_REQUEST,
     FETCH_SERVICE_BY_ID_SUCCESS,
     FETCH_SERVICES_BY_SALON_FAILURE,
     FETCH_SERVICES_BY_SALON_REQUEST,
     FETCH_SERVICES_BY_SALON_SUCCESS,
     UPDATE_SERVICE_FAILURE,
     UPDATE_SERVICE_REQUEST,
     UPDATE_SERVICE_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "/api/service-offering";
import api from "../../Config/api";
import axios from "axios";

export const createServiceAction =
     ({service, jwt}) =>
     async (dispatch) => {
          dispatch({type: CREATE_SERVICE_REQUEST});
          try {
               const {data} = await api.post(`${API_BASE_URL}/salon-owner`, service, {
                    headers: {
                         Authorization: `Bearer ${jwt}`,
                    },
               });
               dispatch({type: CREATE_SERVICE_SUCCESS, payload: data});
          } catch (error) {
               dispatch({type: CREATE_SERVICE_FAILURE, payload: error.message});
          }
     };

export const updateService = (serviceId, service) => async (dispatch) => {
     dispatch({type: UPDATE_SERVICE_REQUEST});

     try {
          const {data} = await axios.put(`${API_BASE_URL}/${serviceId}`, service);
          dispatch({type: UPDATE_SERVICE_SUCCESS, payload: data});
     } catch (error) {
          dispatch({type: UPDATE_SERVICE_FAILURE, payload: error.message});
     }
};

export const fetchServicesBySalonId =
     ({salonId, jwt, categoryId}) =>
     async (dispatch) => {
          dispatch({type: FETCH_SERVICES_BY_SALON_REQUEST});
          try {
               const {data} = await api.get(`${API_BASE_URL}/salon/${salonId}`, {
                    headers: {
                         Authorization: `Bearer ${jwt}`,
                    },
                    params: {categoryId},
               });
               dispatch({type: FETCH_SERVICES_BY_SALON_SUCCESS, payload: data});
          } catch (error) {
               dispatch({type: FETCH_SERVICES_BY_SALON_FAILURE, payload: error.message});
          }
     };

export const fetchServiceById = (serviceId) => async (dispatch) => {
     dispatch({type: FETCH_SERVICE_BY_ID_REQUEST});
     try {
          const {data} = await axios.get(`${API_BASE_URL}/${serviceId}`);
          dispatch({type: FETCH_SERVICE_BY_ID_SUCCESS, payload: data});
     } catch (error) {
          dispatch({type: FETCH_SERVICE_BY_ID_FAILURE, payload: error.message});
     }
};
