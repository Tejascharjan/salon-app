import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { salonReducer } from "./Salon/reducer";
import { authReducer } from "./Auth/reducer";
import { bookingReducer } from "./Booking/reducer";
import { reviewReducer } from "./Review/reducer";
import { categoryReducer } from "./Category/reducer";
import { notificationReducer } from "./Notifications/reducer";
import { serviceOfferingReducer } from "./Salon Services/reducer";
import { chartReducer } from "./Chart/reducer";

const rootReducers = combineReducers({
     salon: salonReducer,
     booking: bookingReducer,
     auth: authReducer,
     review: reviewReducer,
     category: categoryReducer,
     notification: notificationReducer,
     service: serviceOfferingReducer,
     chart: chartReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
