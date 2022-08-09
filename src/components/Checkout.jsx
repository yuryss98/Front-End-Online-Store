import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Checkout extends Component {
  state = {
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    pagamento: '',
    errorMsg: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  finalizarCompra = () => {
    const {
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      pagamento,
    } = this.state;

    if (fullName && email && cpf && phone && cep && address && pagamento) {
      const { history: { push }, clearCart } = this.props;
      push('/');
      clearCart();
    } else {
      this.setState({
        errorMsg: 'Campos inválidos',
      });
    }
  }

  render() {
    const { itensCart } = this.props;
    const { errorMsg } = this.state;
    return (
      <div>
        {itensCart.map((el) => (
          <div key={ el.title }>
            <h3>{ el.title }</h3>
            <h3>{ el.price }</h3>
            <h3>{ el.quantity }</h3>
          </div>
        ))}
        <form>
          <label htmlFor="fullName">
            Nome Completo:
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              data-testid="checkout-fullname"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="email"
              required
              name="email"
              id="email"
              data-testid="checkout-email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="cpf">
            CPF:
            <input
              type="text"
              required
              name="cpf"
              id="cpf"
              data-testid="checkout-cpf"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="phone">
            Telefone:
            <input
              type="text"
              required
              name="phone"
              id="phone"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="cep">
            CEP:
            <input
              type="text"
              required
              name="cep"
              id="cep"
              data-testid="checkout-cep"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="address">
            Endereço:
            <input
              type="text"
              name="address"
              required
              id="address"
              data-testid="checkout-address"
              onChange={ this.handleChange }
            />
          </label>

          <div>
            <h3>Pagamento:</h3>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                name="pagamento"
                required
                value="Boleto"
                id="boleto"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="visa">
              Visa
              <input
                type="radio"
                required
                name="pagamento"
                value="Visa"
                id="visa"
                data-testid="visa-payment"
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="masterCard">
              Master Card
              <input
                type="radio"
                name="pagamento"
                required
                value="Master Card"
                id="masterCard"
                data-testid="master-payment"
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="elo">
              Elo
              <input
                type="radio"
                required
                name="pagamento"
                value="Elo"
                id="elo"
                data-testid="elo-payment"
                onChange={ this.handleChange }
              />
            </label>
          </div>

          {
            errorMsg && <h2 data-testid="error-msg">{ errorMsg }</h2>
          }
          <button
            type="button"
            onClick={ this.finalizarCompra }
            data-testid="checkout-btn"
          >
            Finalizar

          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  itensCart: PropTypes.arrayOf.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  clearCart: PropTypes.func.isRequired,
};
