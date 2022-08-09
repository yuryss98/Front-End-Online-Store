import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class Details extends Component {
  state = {
    product: {},
    email: '',
    comentario: '',
    notaDoProduto: '',
    avaliações: [],
    erroMsg: '',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      product: response,
      avaliações: JSON.parse(localStorage.getItem(id)) || [],
    });
  }

  checarInputs = () => {
    const { email, notaDoProduto } = this.state;
    const checado = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    if (checado && notaDoProduto) {
      this.setState({
        erroMsg: '',
      });
      this.salvarAvaliacao();
    } else {
      this.setState({
        erroMsg: 'Campos inválidos',
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  salvarAvaliacao = () => {
    const { email, comentario, notaDoProduto } = this.state;
    const { match: { params: { id } } } = this.props;
    const obj = {
      email,
      comentario,
      notaDoProduto,
    };

    this.setState((prevState) => ({
      avaliações: [...prevState.avaliações, obj],
    }), () => {
      const { avaliações } = this.state;
      localStorage.setItem(id, JSON.stringify(avaliações));
      this.setState({
        email: '',
        comentario: '',
        notaDoProduto: '',
      });
    });
  }

  render() {
    const { product, email, comentario, isDisabled, erroMsg } = this.state;
    const { title, thumbnail, price } = product;
    const { addItensToCart, match: { params: { id } }, quantidade } = this.props;
    const salvos = JSON.parse(localStorage.getItem(id)) || [];
    const arrayIndex = ['1', '2', '3', '4', '5'];
    return (
      <div>
        <h2 data-testid="shopping-cart-size">{ quantidade() }</h2>
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
              <button
                data-testid="product-detail-add-to-cart"
                onClick={ () => addItensToCart(product) }
                type="button"
              >
                Adicionar ao Carrinho

              </button>

              <form>
                <h3>Avaliações</h3>
                <div>
                  <h3>Digite seu Email</h3>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={ email }
                    placeholder="Digite seu email"
                    data-testid="product-detail-email"
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <h3>Adicione uma nota ao produto:</h3>
                  <div>
                    {arrayIndex.map((el) => (
                      <label htmlFor={ `nota${Number(el)}` } key={ el }>
                        <h4>{ el }</h4>
                        <input
                          type="radio"
                          name="notaDoProduto"
                          value={ Number(el) }
                          id={ `nota${Number(el)}` }
                          data-testid={ `${Number(el)}-rating` }
                          onChange={ this.handleChange }
                        />
                      </label>
                    ))}
                  </div>

                </div>
                <div>
                  <h3>Adicione um comentario ao produto</h3>
                  <input
                    type="text"
                    name="comentario"
                    id="comentario"
                    value={ comentario }
                    required
                    placeholder="Mensagem(opcional)"
                    data-testid="product-detail-evaluation"
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <h3>Deseja confirmar a avaliação ?</h3>
                  {erroMsg && <p data-testid="error-msg">Campos inválidos</p>}
                  <button
                    data-testid="submit-review-btn"
                    type="button"
                    onClick={ this.checarInputs }
                    disabled={ isDisabled }
                  >
                    Avaliar

                  </button>
                </div>
              </form>
            </div>
          )
        }

        {
          salvos.length > 0 && salvos.map((el, index) => (
            <div key={ index }>
              <h4 data-testid="review-card-email">{ el.email }</h4>
              <h4 data-testid="review-card-rating">{ el.notaDoProduto }</h4>
              <h4 data-testid="review-card-evaluation">{ el.comentario }</h4>
            </div>
          ))
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
  addItensToCart: PropTypes.func.isRequired,
  quantidade: PropTypes.func.isRequired,
};
