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
    const index = addItens.findIndex((el) => el.title === title);
    console.log(index);
    if (index < 0) {
      this.setState((prevState) => ({
        addItens: [...prevState.addItens, { title, price, quantity: 1 }],
      }));
    }
    // else {
    //   this.setState((prevState) => {
    //     prevState.addItens[index].quantity += 1;
    //     return { addItens: [...prevState] };
    //   });
    // }
  }

  render() {
    const { addItens } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/details/:id" component={ Details } />
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
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
