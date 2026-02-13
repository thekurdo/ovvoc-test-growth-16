const assert = require('assert');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('  PASS: ' + name);
    passed++;
  } catch (err) {
    console.log('  FAIL: ' + name);
    console.log('    ' + err.message);
    failed++;
  }
}

console.log('\novvoc-test-growth-16: React 18 + Router 5 + Redux 4 multi-package tests\n');

// ---- React.forwardRef tests ----
console.log('React.forwardRef:');

test('React.forwardRef is a function', function () {
  const React = require('react');
  assert.strictEqual(typeof React.forwardRef, 'function');
});

test('forwardRef creates a valid component object', function () {
  const React = require('react');
  const Comp = React.forwardRef(function TestComp(props, ref) {
    return null;
  });
  assert.ok(Comp.$$typeof !== undefined || Comp.render !== undefined,
    'forwardRef should produce a component-like object');
});

test('HomeHero is created via forwardRef', function () {
  const { HomeHero } = require('../src/pages/Home');
  assert.ok(HomeHero, 'HomeHero should be exported');
  assert.strictEqual(HomeHero.displayName, 'HomeHero');
});

test('ActionButton is created via forwardRef', function () {
  const { ActionButton } = require('../src/pages/ProductDetail');
  assert.ok(ActionButton, 'ActionButton should be exported');
  assert.strictEqual(ActionButton.displayName, 'ActionButton');
});

// ---- defaultProps tests ----
console.log('\ndefaultProps:');

test('ProductCard class component has defaultProps', function () {
  const { ProductCard } = require('../src/pages/Products');
  assert.ok(ProductCard.defaultProps, 'ProductCard should have defaultProps');
  assert.strictEqual(ProductCard.defaultProps.badge, 'New');
  assert.strictEqual(typeof ProductCard.defaultProps.onSelect, 'function');
});

test('ActionButton has defaultProps', function () {
  const { ActionButton } = require('../src/pages/ProductDetail');
  assert.ok(ActionButton.defaultProps, 'ActionButton should have defaultProps');
  assert.strictEqual(ActionButton.defaultProps.variant, 'primary');
  assert.strictEqual(ActionButton.defaultProps.disabled, false);
});

// ---- Redux createStore tests ----
console.log('\nRedux createStore:');

test('createStore is exported from redux', function () {
  const { createStore } = require('redux');
  assert.strictEqual(typeof createStore, 'function');
});

test('store is created successfully with createStore', function () {
  const { store } = require('../src/store');
  assert.ok(store, 'store should exist');
  assert.strictEqual(typeof store.getState, 'function');
  assert.strictEqual(typeof store.dispatch, 'function');
  assert.strictEqual(typeof store.subscribe, 'function');
});

test('store has correct initial state shape', function () {
  const { store } = require('../src/store');
  const state = store.getState();
  assert.ok(state.user, 'state should have user slice');
  assert.ok(state.products, 'state should have products slice');
  assert.strictEqual(state.user.current, null);
  assert.deepStrictEqual(state.products.items, []);
});

test('store dispatch works with sync action', function () {
  const { createStore, combineReducers } = require('redux');
  // Create a fresh store for this test to avoid state pollution
  function counterReducer(state, action) {
    if (state === undefined) state = { count: 0 };
    if (action.type === 'INCREMENT') return { count: state.count + 1 };
    return state;
  }
  const testStore = createStore(combineReducers({ counter: counterReducer }));
  testStore.dispatch({ type: 'INCREMENT' });
  assert.strictEqual(testStore.getState().counter.count, 1);
});

test('applyMiddleware with thunk works', function () {
  const { store } = require('../src/store');
  // Thunk middleware allows dispatching functions
  let thunkCalled = false;
  store.dispatch(function (dispatch) {
    thunkCalled = true;
  });
  assert.strictEqual(thunkCalled, true, 'thunk middleware should allow function dispatch');
});

// ---- React Router 5 tests ----
console.log('\nReact Router 5 (Switch / useHistory):');

test('Switch is exported from react-router-dom', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(typeof rrd.Switch, 'function',
    'Switch should be a function (React Router 5)');
});

test('Route is exported from react-router-dom', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(typeof rrd.Route, 'function');
});

test('Redirect is exported from react-router-dom', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(typeof rrd.Redirect, 'function',
    'Redirect should be exported (React Router 5)');
});

test('useHistory is exported from react-router-dom', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(typeof rrd.useHistory, 'function',
    'useHistory should be a function (React Router 5)');
});

test('useParams is exported from react-router-dom', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(typeof rrd.useParams, 'function');
});

test('BrowserRouter is exported from react-router-dom', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(typeof rrd.BrowserRouter, 'function');
});

test('Routes is NOT exported in React Router 5', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(rrd.Routes, undefined,
    'Routes should not exist in React Router 5 (it was added in v6)');
});

test('useNavigate is NOT exported in React Router 5', function () {
  const rrd = require('react-router-dom');
  assert.strictEqual(rrd.useNavigate, undefined,
    'useNavigate should not exist in React Router 5 (it was added in v6)');
});

// ---- React-Redux tests ----
console.log('\nReact-Redux:');

test('useSelector is exported from react-redux', function () {
  const { useSelector } = require('react-redux');
  assert.strictEqual(typeof useSelector, 'function');
});

test('useDispatch is exported from react-redux', function () {
  const { useDispatch } = require('react-redux');
  assert.strictEqual(typeof useDispatch, 'function');
});

test('Provider is exported from react-redux', function () {
  const { Provider } = require('react-redux');
  assert.ok(Provider, 'Provider should be exported');
});

// ---- Summary ----
console.log('\n' + '='.repeat(50));
console.log('Results: ' + passed + ' passed, ' + failed + ' failed, ' + (passed + failed) + ' total');
console.log('='.repeat(50) + '\n');

if (failed > 0) {
  process.exit(1);
}
