const isBrowser = typeof window !== "undefined";

const initialState = {
  _id: isBrowser ? JSON.parse(localStorage.getItem("user"))?._id || null : null,
  rol: isBrowser
    ? JSON.parse(localStorage.getItem("user"))?.rol || null
    : null,
  name: isBrowser
    ? JSON.parse(localStorage.getItem("user"))?.name || null
    : null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      const newState = {
        ...state,
        ...action.payload,
      };

      localStorage.setItem("user", JSON.stringify(newState));

      return newState;
    default:
        return state;
  }
};

export default userReducer;
