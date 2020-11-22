import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StoreConfig } from './redux/store';
import './App.css';

const store = StoreConfig();

class App extends Component {

  render() {
    return (
      /* Redux store becomes available to all the components */
      <Provider store={store}>
        <BrowserRouter>  
        <div className="App">
          <Main />
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
