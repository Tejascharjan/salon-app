import {Category} from "@mui/icons-material";
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

const initialState = {
     categories: [],
     Category: null,
     loading: false,
     error: null,
};

export const categoryReducer = (state = initialState, action) => {
     switch (action.type) {
          case CREATE_CATEGORY_REQUEST:
          case GET_ALL_CATEGORIES_REQUEST:
          case GET_CATEGORY_BY_SALON_REQUEST:
          case GET_CATEGORY_BY_ID_REQUEST:
          case DELETE_CATEGORY_REQUEST:
               return {...state, loading: true, error: null};

          case CREATE_CATEGORY_SUCCESS:
               return {...state, loading: false, categories: [...state.categories, action.payload]};

          case GET_ALL_CATEGORIES_SUCCESS:
               return {...state, loading: false, categories: action.payload};

          case GET_CATEGORY_BY_SALON_SUCCESS:
               return {...state, loading: false, categories: action.payload};

          case GET_CATEGORY_BY_ID_SUCCESS:
               return {...state, loading: false, Category: action.payload};

          case DELETE_CATEGORY_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    categories: state.categories.filter((category) => category.id !== action.payload),
               };

          case CREATE_CATEGORY_FAILURE:
          case GET_ALL_CATEGORIES_FAILURE:
          case GET_CATEGORY_BY_SALON_FAILURE:
          case GET_CATEGORY_BY_ID_FAILURE:
          case DELETE_CATEGORY_FAILURE:
               return {...state, loading: false, error: action.payload};

          default:
               return state;
     }
};
