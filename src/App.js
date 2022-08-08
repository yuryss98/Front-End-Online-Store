import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Details from './components/Details';

class App extends Component {
  state = {
    addItens: [],
  }

  addItensToCart = (item) => {
    const { price, title } = item;
    const { addItens } = this.state;
    const obj = {
      price,
      title,
      quantity: 1,
    };
    const temOuNao = addItens.findIndex((el) => el.title === title);
    if (temOuNao < 0) {
      this.setState((prevState) => ({
        addItens: [...prevState.addItens, obj],
      }));
    } else {
      addItens[temOuNao].quantity += 1;
      this.setState({
        addItens,
      });
    }
  }

  increaseQuantity = (el) => {
    const { addItens } = this.state;
    const buscar = addItens.findIndex((obj) => obj.title === el.title);
    addItens[buscar].quantity += 1;
    this.setState({
      addItens,
    });
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
              />) }
            />
            <Route
              exact
              path="/"
              render={ (props) => (<Home
                { ...props }
                addItensToCart={ this.addItensToCart }
              />) }
            />
            <Route
              exact
              path="/cart/"
              render={ (props) => (<Cart
                { ...props }
                addItens={ addItens }
                addItensToCart={ this.addItensToCart }
                increaseQuantity={ this.increaseQuantity }
                decreaseQuantity={ this.decreaseQuantity }
                removeItem={ this.removeItem }
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
