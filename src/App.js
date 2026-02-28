const React = require('react');
const { BrowserRouter, Switch, Route, Redirect, Link, useHistory } = require('react-router-dom');
const { Provider } = require('react-redux');
const { store } = require('./store');
const Home = require('./pages/Home');
const Products = require('./pages/Products');
const ProductDetail = require('./pages/ProductDetail');

// Navigation bar using useHistory() — React Router 5 pattern
function NavBar() {
  const history = useHistory();

  function goHome() {
    history.push('/');
  }

  function goProducts() {
    history.push('/products');
  }

  return React.createElement('nav', { className: 'navbar' },
    React.createElement('button', { onClick: goHome }, 'Home'),
    React.createElement('button', { onClick: goProducts }, 'Products'),
    React.createElement(Link, { to: '/about' }, 'About')
  );
}

// Main App — React Router 5 with Switch + Route + Redirect
function App() {
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(
      BrowserRouter,
      null,
      React.createElement(NavBar),
      React.createElement(
        Switch,
        null,
        React.createElement(Route, { exact: true, path: '/', component: Home }),
        React.createElement(Route, { exact: true, path: '/products', component: Products }),
        React.createElement(Route, { path: '/products/:id', component: ProductDetail }),
        React.createElement(Route, { path: '/about' }, React.createElement('div', null, 'About page')),
        React.createElement(Redirect, { from: '/home', to: '/' }),
        React.createElement(Route, { path: '*' }, React.createElement('div', null, '404 Not Found'))
      )
    )
  );
}

module.exports = App;
module.exports.NavBar = NavBar;
