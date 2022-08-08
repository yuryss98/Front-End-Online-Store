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
    const temOuNao = addItens.find((el) => el.title === title);
    if (!temOuNao) {
      this.setState((prevState) => ({
        addItens: [...prevState.addItens, obj],
      }));
    } else {
      temOuNao.quantity += 1;
    }
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
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
