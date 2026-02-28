const React = require('react');

// React.forwardRef pattern — will need updates for React 19 (ref as prop)
const HomeHero = /* TODO: forwardRef is no longer needed in React 19 - ref is a regular prop */function HomeHero(props, ref) {
  return React.createElement('section', { ref: ref, className: 'hero' },
    React.createElement('h1', null, props.title || 'Welcome to the Store'),
    React.createElement('p', null, props.subtitle || 'Browse our amazing products')
  );
});

HomeHero.displayName = 'HomeHero';

// Home page component
function Home() {
  const heroRef = React.useRef(null);

  return React.createElement('div', { className: 'home-page' },
    React.createElement(HomeHero, { ref: heroRef, title: 'Our Store', subtitle: 'Quality widgets and gadgets' }),
    React.createElement('div', { className: 'features' },
      React.createElement('div', null, 'Fast shipping'),
      React.createElement('div', null, 'Easy returns'),
      React.createElement('div', null, '24/7 support')
    )
  );
}

module.exports = Home;
module.exports.HomeHero = HomeHero;
