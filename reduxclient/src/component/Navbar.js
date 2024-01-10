// Navbar.js
import React from 'react';
import { connect } from 'react-redux';

const Navbar = ({ someValueFromRedux, dispatch }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <strong>Home  </strong>
          </a>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    // Map state properties to props
    someValueFromRedux: state.someValue,
  };
};

export default connect(mapStateToProps)(Navbar);
