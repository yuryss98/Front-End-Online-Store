import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Details from './components/Details';
import Checkout from './components/Checkout';

class App extends Component {
  state = {
    addItens: JSON.parse(localStorage.getItem('Cart')) || [],
  }

  componentDidUpdate() {
    const { addItens } = this.state;
    localStorage.setItem('Cart', JSON.stringify(addItens));
  }

  quantidadeDeProdutos = () => {
    const { addItens } = this.state;
    if (addItens) {
      const quantidade = addItens.reduce((acc, curr) => {
        acc += curr.quantity;
        return acc;
      }, 0);
      return quantidade;
    }
  }

  addItensToCart = (item) => {
    const { price, title } = item;
    const { available_quantity: availableQuantity } = item;
    const { addItens } = this.state;
    const obj = {
      price,
      title,
      quantity: 1,
      estoque: availableQuantity,
    };
    const index = addItens.findIndex((el) => el.title === title);
    if (index < 0) {
      this.setState((prevState) => ({
        addItens: [...prevState.addItens, obj],
      }));
    } else {
      const copy = [...addItens];
      copy[index].quantity += 1;
      this.setState({ addItens: copy });
    }
  }

  increaseQuantity = (el, quantidade) => {
    const { addItens } = this.state;
    const buscar = addItens.findIndex((obj) => obj.title === el.title);
    if (addItens[buscar].quantity < quantidade) {
      addItens[buscar].quantity += 1;
      this.setState({
        addItens,
      });
    }
  }

  decreaseQuantity = (el) => {
    const { addItens } = this.state;
    const buscar = addItens.findIndex((obj) => obj.title === el.title);
    if (addItens[buscar].quantity > 1) {
      addItens[buscar].quantity -= 1;
      this.setState({
        addItens,
      });
    }
  }

  removeItem = (el) => {
    const { addItens } = this.state;
    this.setState({
      addItens: addItens.filter((item) => item.title !== el.title),
    });
  }

  clearCart = () => {
    this.setState({
      addItens: '',
    });
  }

  render() {
    const { addItens } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/details/:id"
              render={ (props) => (<Details
                { ...props }
                addItensToCart={ this.addItensToCart }
                quantidade={ this.quantidadeDeProdutos }
              />) }
            />
            <Route
              exact
              path="/"
              render={ (props) => (<Home
                { ...props }
                addItensToCart={ this.addItensToCart }
                quantidade={ this.quantidadeDeProdutos }
              />) }
            />
            <Route
              exact
              path="/cart/"
              render={ (props) => (<Cart
                { ...props }
                itensCart={ addItens }
                addItensToCart={ this.addItensToCart }
                increaseQuantity={ this.increaseQuantity }
                decreaseQuantity={ this.decreaseQuantity }
                removeItem={ this.removeItem }
              />) }
            />
            <Route
              exact
              path="/checkout"
              render={ (props) => (
                <Checkout
                  { ...props }
                  clearCart={ this.clearCart }
                  itensCart={ addItens }
                />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
