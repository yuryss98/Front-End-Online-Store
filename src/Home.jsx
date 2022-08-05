// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <input type="text" name="" id="" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        <Link data-testid="shopping-cart-button" to="/carrinho">
          <button
            type="button"

          >
            Carrinho
          </button>

        </Link>

      </div>
    );
  }
}
