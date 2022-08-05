import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Carrinho from './Carrinho';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/carrinho" component={ Carrinho } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
