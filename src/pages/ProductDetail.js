const React = require('react');
const { useSelector, useDispatch } = require('react-redux');
const { useParams, useHistory } = require('react-router-dom');
const { selectProduct } = require('../store');

// React.forwardRef for a reusable button component
const ActionButton = function ActionButton({
  variant = 'primary',
  disabled = false,
  ref,
  ...props
}) {
  return React.createElement('button', {
    ref: ref,
    className: 'action-btn ' + variant,
    onClick: props.onClick,
    disabled: disabled,
  }, props.children);
};

ActionButton.displayName = 'ActionButton';

// Product detail page — uses useParams() and use