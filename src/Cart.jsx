import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  state = {
    test: this.props.addItens,
  }

  increaseQuantity = (el) => {
    const { test } = this.state;
    const buscar = test.findIndex((obj) => obj.title === el.title);
    this.setState((prevState) => ({
      test: [...prevState.test],
      // [test[buscar].quantity]: 50,
    }));
  }

  render() {
    const { test } = this.state;
    return (
      <div>
        {
          (test.length === 0) ? (
            <div>
              <input type="text" name="" id="" />
              <p
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </p>
            </div>
          ) : test.map((el) => (
            <div key={ el.title }>
              <p data-testid="shopping-cart-product-name">{ el.title }</p>
              <p>{ el.price }</p>
              <p data-testid="shopping-cart-product-quantity">{ el.quantity }</p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseQuantity(el) }
              >
                +

              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
              >
                -

              </button>
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
