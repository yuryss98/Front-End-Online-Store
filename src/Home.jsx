// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from './services/api';

export default class Home extends Component {
  state = {
    listCategory: [],
  }

  async componentDidMount() {
    const result = await getCategories();
    this.setState({
      listCategory: result,
    }, () => {
      const { listCategory } = this.state;
      console.log(listCategory);
    });
  }

  // arrumando req 4

  render() {
    const { listCategory } = this.state;
    return (
      <div>
        <input type="text" name="" id="" />
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
      </div>
    );
  }
}
