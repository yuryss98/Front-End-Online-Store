import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

export default class Home extends Component {
  state = {
    listCategory: [],
    search: '',
    listProducts: '',
    test: '',
    itemsCategory: [],
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

  getProductsByCategory = async ({ target }) => {
    const { value } = target;
    const { listCategory } = this.state;
    const filterProducts = listCategory.filter((product) => product.name === value);
    const response = await getProductsFromCategoryAndQuery(filterProducts[0].id, '');
    this.setState({
      itemsCategory: response.results,
    });
  }

  render() {
    const { listCategory, listProducts, test, itemsCategory } = this.state;
    const { addItensToCart } = this.props;
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
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
        {
          listCategory && (
            <div>
              {listCategory.map(
                ({ id, name }) => (
                  <label htmlFor={ id } key={ id } data-testid="category">
                    <input
                      name="category"
                      id={ id }
                      value={ name }
                      type="radio"
                      onChange={ this.getProductsByCategory }
                    />
                    { name }
                  </label>
                ),
              )}
            </div>)
        }

        {
          listProducts ? listProducts.results.map((product) => (
            <div key={ product.id } data-testid="product">
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.price }</p>
              <Link
                to={ `/details/${product.id}` }
                data-testid="product-detail-link"
              >
                Ver Detalhes

              </Link>
            </div>
          )) : <p>{ test }</p>
        }

        {
          itemsCategory.length > 0 && (
            itemsCategory.map((item) => (
              <div key={ item.id } data-testid="product">
                <p>{ item.title }</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{ item.price }</p>
                <Link
                  to={ `/details/${item.id}` }
                  data-testid="product-detail-link"
                >
                  Ver Detalhes

                </Link>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ () => addItensToCart(item) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))
          )
        }

      </div>
    );
  }
}

Home.propTypes = {
  addItensToCart: PropTypes.func.isRequired,
};
