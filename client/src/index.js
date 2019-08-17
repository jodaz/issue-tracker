import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';

import Landing from './scenes/Landing';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const App = () => (
  <div className="App">
    <Provider store={createStore}>
      <div className="App-body">
        <Landing />
      </div>
    </Provider>
    <Footer />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
