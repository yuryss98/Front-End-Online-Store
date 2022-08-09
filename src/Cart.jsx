import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  render() {
    const { itensCart, increaseQuantity, decreaseQuantity, removeItem } = this.props;
    return (
      <div>
        {
          (itensCart.length === 0) ? (
            <div>
              <input type="text" name="" id="" />
              <p
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </p>
            </div>
          ) : itensCart.map((el) => (
            <div key={ el.title }>
              <p data-testid="shopping-cart-product-name">{ el.title }</p>
              <p>{ el.price }</p>
              <p data-testid="shopping-cart-product-quantity">{ el.quantity }</p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => increaseQuantity(el) }
              >
                +

              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => decreaseQuantity(el) }
              >
                -

              </button>
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => removeItem(el) }
              >
                Remover Item

              </button>
            </div>
          ))
        }
      </div>
    );
  }
}

Cart.propTypes = {
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  itensCart: PropTypes.arrayOf.isRequired,
};
