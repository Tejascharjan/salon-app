import {
     ADD_NOTIFICATION,
     FETCH_NOTIFICATIONS_BY_SALON_FAILURE,
     FETCH_NOTIFICATIONS_BY_SALON_REQUEST,
     FETCH_NOTIFICATIONS_BY_SALON_SUCCESS,
     FETCH_NOTIFICATIONS_BY_USER_FAILURE,
     FETCH_NOTIFICATIONS_BY_USER_REQUEST,
     FETCH_NOTIFICATIONS_BY_USER_SUCCESS,
     FETCH_NOTIFICATIONS_FAILURE,
     FETCH_NOTIFICATIONS_REQUEST,
     FETCH_NOTIFICATIONS_SUCCESS,
     MARK_NOTIFICATION_AS_READ_FAILURE,
     MARK_NOTIFICATION_AS_READ_REQUEST,
     MARK_NOTIFICATION_AS_READ_SUCCESS,
} from "./actionTypes";

const intialState = {
     notifications: [],
     loading: false,
     error: null,
     unreadCount: 0,
};

export const notificationReducer = (state = intialState, action) => {
     switch (action.type) {
          case FETCH_NOTIFICATIONS_BY_USER_REQUEST:
          case FETCH_NOTIFICATIONS_BY_SALON_REQUEST:
          case FETCH_NOTIFICATIONS_REQUEST:
          case MARK_NOTIFICATION_AS_READ_REQUEST:
               return {...state, loading: true, error: null};

          case FETCH_NOTIFICATIONS_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    notifications: action.payload,
               };

          case FETCH_NOTIFICATIONS_BY_USER_SUCCESS:
          case FETCH_NOTIFICATIONS_BY_SALON_SUCCESS:
               const unreadCount = action.payload.filter((notification) => !notification.isRead).length;
               return {
                    ...state,
                    loading: false,
                    notifications: action.payload,
                    unreadCount,
               };

          case ADD_NOTIFICATION:
               return {
                    ...state,
                    notifications: [action.payload, ...state.notifications],
                    unreadCount: state.unreadCount + 1,
               };

          case MARK_NOTIFICATION_AS_READ_SUCCESS:
               return {
                    ...state,
                    notifications: state.notifications.map((notification) =>
                         notification.id === action.payload.id ? action.payload : notification,
                    ),
                    unreadCount: state.unreadCount - 1,
               };

          case FETCH_NOTIFICATIONS_FAILURE:
          case FETCH_NOTIFICATIONS_BY_USER_FAILURE:
          case FETCH_NOTIFICATIONS_BY_SALON_FAILURE:
          case MARK_NOTIFICATION_AS_READ_FAILURE:
               return {...state, loading: false, error: action.payload};

          default:
               return state;
     }
};
