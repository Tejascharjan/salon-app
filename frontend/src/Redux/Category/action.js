const BASE_URL = "/api/categories";
import axios from "axios";
import api from "../../Config/api";
import {
     CREATE_CATEGORY_FAILURE,
     CREATE_CATEGORY_REQUEST,
     CREATE_CATEGORY_SUCCESS,
     DELETE_CATEGORY_FAILURE,
     DELETE_CATEGORY_REQUEST,
     DELETE_CATEGORY_SUCCESS,
     GET_ALL_CATEGORIES_FAILURE,
     GET_ALL_CATEGORIES_REQUEST,
     GET_ALL_CATEGORIES_SUCCESS,
     GET_CATEGORY_BY_ID_FAILURE,
     GET_CATEGORY_BY_ID_REQUEST,
     GET_CATEGORY_BY_ID_SUCCESS,
     GET_CATEGORY_BY_SALON_FAILURE,
     GET_CATEGORY_BY_SALON_REQUEST,
     GET_CATEGORY_BY_SALON_SUCCESS,
} from "./actionTypes";

export const createCategory =
     ({category, jwt}) =>
     async (dispatch) => {
          dispatch({type: CREATE_CATEGORY_REQUEST});
          try {
               const config = {
                    headers: {
                         Authorization: `Bearer ${jwt}`,
                    },
               };
               const response = await api.post(`${BASE_URL}/salon-owner`, category, config);
               dispatch({type: CREATE_CATEGORY_SUCCESS, payload: response.data});
          } catch (error) {
               dispatch({type: CREATE_CATEGORY_FAILURE, payload: error.response?.data || "Error creating category"});
          }
     };

export const getAllCategories = () => async (dispatch) => {
     dispatch({type: GET_ALL_CATEGORIES_REQUEST});
     try {
          const response = await api.get(BASE_URL);
          dispatch({type: GET_ALL_CATEGORIES_SUCCESS, payload: response.data});
     } catch (error) {
          dispatch({type: GET_ALL_CATEGORIES_FAILURE, payload: error.response?.data || "Error fetching categories"});
     }
};

export const getCategoriesBySalon =
     ({jwt, salonId}) =>
     async (dispatch) => {
          dispatch({type: GET_CATEGORY_BY_SALON_REQUEST});
          try {
               const config = {
                    headers: {
                         Authorization: `Bearer ${jwt}`,
                         "Content-Type": "application/json",
                    },
               };
               const response = await api.get(`${BASE_URL}/salon/${salonId}`, config);
               dispatch({type: GET_CATEGORY_BY_SALON_SUCCESS, payload: response.data});
          } catch (error) {
               dispatch({
                    type: GET_CATEGORY_BY_SALON_FAILURE,
                    payload: error.response?.data || "Error fetching categories for salon",
               });
          }
     };

export const getCategoryById = (id) => async (dispatch) => {
     dispatch({type: GET_CATEGORY_BY_ID_REQUEST});
     try {
          const response = await api.get(`${BASE_URL}/${id}`);
          dispatch({type: GET_CATEGORY_BY_ID_SUCCESS, payload: response.data});
     } catch (error) {
          dispatch({
               type: GET_CATEGORY_BY_ID_FAILURE,
               payload: error.response?.data || "Error fetching category by ID",
          });
     }
};

export const deleteCategory = (id) => async (dispatch) => {
     dispatch({type: DELETE_CATEGORY_REQUEST});
     try {
          await axios.delete(`${BASE_URL}/${id}`);
          dispatch({type: DELETE_CATEGORY_SUCCESS, payload: id});
     } catch (error) {
          dispatch({
               type: DELETE_CATEGORY_FAILURE,
               payload: error.response?.data || "Error deleting category",
          });
     }
};
