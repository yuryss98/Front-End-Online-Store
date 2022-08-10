import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
                onClick={ () => increaseQuantity(el, el.estoque) }
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

        {
          itensCart.length > 0 && (
            <Link
              data-testid="checkout-products"
              to="/checkout"
            >
              Finalizar Compra

            </Link>)
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
