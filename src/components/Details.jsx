import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class Details extends Component {
  state = {
    product: {},
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      product: response,
    });
  }

  render() {
    const { product } = this.state;
    const { title, thumbnail, price } = product;
    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Ir para o carrinho de compras

        </Link>

        {
          product && (
            <div>
              <p data-testid="product-detail-name">{ title }</p>
              <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
              <p data-testid="product-detail-price">{ price }</p>
            </div>
          )
        }

      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
