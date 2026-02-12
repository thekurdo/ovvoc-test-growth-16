const { createStore, combineReducers, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

// ---------- User reducer ----------
const initialUserState = { current: null, loading: false, error: null };

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'USER_LOGIN_SUCCESS':
      return { ...state, loading: false, current: action.payload };
    case 'USER_LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return { ...initialUserState };
    default:
      return state;
  }
}

// ---------- Products reducer ----------
const initialProductsState = { items: [], loading: false, selectedId: null };

function productsReducer(state = initialProductsState, action) {
  switch (action.type) {
    case 'PRODUCTS_FETCH_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCTS_FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'PRODUCTS_SELECT':
      return { ...state, selectedId: action.payload };
    default:
      return state;
  }
}

// ---------- Root reducer ----------
const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

// ---------- Store ----------
const store = createStore(rootReducer, applyMiddleware(thunk));

// ---------- Action creators ----------
function loginUser(username, password) {
  return function (dispatch) {
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    // Simulate async login
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === 'secret') {
          const user = { id: 1, username };
          dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user });
          resolve(user);
        } else {
          dispatch({ type: 'USER_LOGIN_FAILURE', payload: 'Invalid credentials' });
          resolve(null);
        }
      }, 100);
    });
  };
}

function logoutUser() {
  return { type: 'USER_LOGOUT' };
}

function fetchProducts() {
  return function (dispatch) {
    dispatch({ type: 'PRODUCTS_FETCH_REQUEST' });
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = [
          { id: 1, name: 'Widget A', price: 9.99 },
          { id: 2, name: 'Widget B', price: 19.99 },
          { id: 3, name: 'Gadget C', price: 49.99 },
        ];
        dispatch({ type: 'PRODUCTS_FETCH_SUCCESS', payload: products });
        resolve(products);
      }, 100);
    });
  };
}

function selectProduct(id) {
  return { type: 'PRODUCTS_SELECT', payload: id };
}

module.exports = {
  store,
  rootReducer,
  loginUser,
  logoutUser,
  fetchProducts,
  selectProduct,
  createStore,
  combineReducers,
  applyMiddleware,
};
