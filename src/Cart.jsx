import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  render() {
    const { addItens } = this.props;
    return (
      <div>
        {
          (addItens.length === 0) ? (
            <div>
              <input type="text" name="" id="" />
              <p
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </p>
            </div>
          ) : addItens.map((el) => (
            <div key={ el.title }>
              <p data-testid="shopping-cart-product-name">{ el.title }</p>
              <p>{ el.price }</p>
              <p data-testid="shopping-cart-product-quantity">{ el.quantity }</p>
            </div>
          ))
        }
      </div>
    );
  }
}

Cart.propTypes = {
  addItens: PropTypes.arrayOf.isRequired,
};
