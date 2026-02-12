const React = require('react');
const { useSelector, useDispatch } = require('react-redux');
const { fetchProducts, selectProduct } = require('../store');

// Class component with defaultProps — deprecated in React 18.3+ / removed in React 19
class ProductCard extends React.Component {
  render() {
    const { product, onSelect } = this.props;
    return React.createElement('div', {
      className: 'product-card',
      onClick: () => onSelect(product.id),
    },
      React.createElement('h3', null, product.name),
      React.createElement('span', { className: 'price' }, '$' + product.price.toFixed(2)),
      React.createElement('span', { className: 'badge' }, this.props.badge)
    );
  }
}

// defaultProps on class component — React 18 pattern, needs migration for React 19
ProductCard.defaultProps = {
  badge: 'New',
  onSelect: function () {},
};

// Products listing page using useSelector + useDispatch
function Products() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(function (state) { return state.products; });
  const user = useSelector(function (state) { return state.user.current; });

  React.useEffect(function () {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return React.createElement('div', { className: 'loading' }, 'Loading products...');
  }

  return React.createElement('div', { className: 'products-page' },
    React.createElement('h2', null, user ? 'Welcome back, ' + user.username : 'Our Products'),
    React.createElement('div', { className: 'product-grid' },
      items.map(function (product) {
        return React.createElement(ProductCard, {
          key: product.id,
          product: product,
          onSelect: function (id) { dispatch(selectProduct(id)); },
        });
      })
    )
  );
}

module.exports = Products;
module.exports.ProductCard = ProductCard;
