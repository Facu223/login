import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";

const token = localStorage.getItem("authToken");

// Initial state
const initialState = {
   token: "",
   isAuthenticated: false,
   user: {},
};

if (token) {
   initialState.token = token;
   initialState.isAuthenticated = true;
   initialState.user = JSON.parse(localStorage.getItem("user"));
}

// Reducer
const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case "LOGIN":
         return {
            ...state,
            isAuthenticated: true,
            token: action.payload.token,
            user: action.payload.user,
         };

      case "LOGOUT":
         return {
            ...state,
            isAuthenticated: false,
            token: "",
            user: {},
         };

      default:
         return state;
   }
};

const store = createStore(authReducer, composeWithDevTools());

export default store;
