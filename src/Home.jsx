// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

export default class Home extends Component {
  state = {
    listCategory: [],
    search: '',
    listProducts: '',
    test: '',
  }

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      listCategory: result,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  getProducts = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery('', search);
    if (response.results.length !== 0) {
      this.setState({
        listProducts: response,
      });
    } else {
      this.setState({
        test: 'Nenhum produto foi encontrado',
      });
    }
  }

  render() {
    const { listCategory, listProducts, test } = this.state;
    return (
      <div>
        <input
          type="text"
          name="search"
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.getProducts }
        >
          Pesquisar

        </button>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
        {
          listCategory && (
            <div>
              {listCategory.map(
                (category) => (
                  <div
                    key={ category.id }
                  >
                    <p data-testid="category">
                      {category.name}
                    </p>
                    <button type="button">Acessar</button>
                  </div>),
              )}
            </div>)
        }

        {
          listProducts ? listProducts.results.map((product) => (
            <div key={ product.id } data-testid="product">
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.price }</p>
            </div>
          )) : <p>{ test }</p>
        }

      </div>
    );
  }
}
