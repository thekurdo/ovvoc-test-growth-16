const React = require('react');
const { useSelector, useDispatch } = require('react-redux');
const { useParams, useHistory } = require('react-router-dom');
const { selectProduct } = require('../store');

// React.forwardRef for a reusable button component
const ActionButton = React.forwardRef(function ActionButton(props, ref) {
  return React.createElement('button', {
    ref: ref,
    className: 'action-btn ' + (props.variant || 'primary'),
    onClick: props.onClick,
    disabled: props.disabled,
  }, props.children);
});

ActionButton.displayName = 'ActionButton';

// defaultProps on function component wrapped with forwardRef
ActionButton.defaultProps = {
  variant: 'primary',
  disabled: false,
};

// Product detail page — uses useParams() and useHistory() from React Router 5
function ProductDetail() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector(function (state) {
    return state.products.items.find(function (p) { return p.id === Number(id); });
  });
  const btnRef = React.useRef(null);

  React.useEffect(function () {
    dispatch(selectProduct(Number(id)));
  }, [id, dispatch]);

  function goBack() {
    history.goBack();
  }

  function goToProducts() {
    history.push('/products');
  }

  if (!product) {
    return React.createElement('div', { className: 'not-found' },
      React.createElement('p', null, 'Product not found'),
      React.createElement(ActionButton, { onClick: goToProducts, ref: btnRef }, 'Back to Products')
    );
  }

  return React.createElement('div', { className: 'product-detail' },
    React.createElement('h2', null, product.name),
    React.createElement('p', { className: 'price' }, '$' + product.price.toFixed(2)),
    React.createElement('div', { className: 'actions' },
      React.createElement(ActionButton, { onClick: goBack, variant: 'secondary' }, 'Go Back'),
      React.createElement(ActionButton, { onClick: function () { /* add to cart */ } }, 'Add to Cart')
    )
  );
}

module.exports = ProductDetail;
module.exports.ActionButton = ActionButton;
